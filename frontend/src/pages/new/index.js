import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "unform";
import DatePicker, { registerLocale } from "react-datepicker";
import { MdAddCircleOutline, MdAddAPhoto } from "react-icons/md";
import { parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { toast } from "react-toastify";

import {
  Container,
  InnerContainer,
  ButtonContainer,
  SaveButton
} from "./styles";
import Header from "../../components/header";
import api from "../../services/api";
import BannerDefault from "../../assets/images/default.png";
import history from "../../services/history";

registerLocale("pt-BR", ptBR);

export default function New({ match }) {
  const profile = useSelector(state => state.user.profile);
  const { id } = match.params;
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [informations, setInformations] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPreview(BannerDefault);
    async function getMeetupInformations() {
      if (id) {
        const response = await api.get(`/meetups/${id}`);

        setInformations(response.data);

        setDate(parseISO(response.data.date));
        setPreview(`http://localhost:3333/uploads/${response.data.file.path}`);
      }
    }

    getMeetupInformations();
  }, [id]);

  async function handleChange(e) {
    const data = new FormData();

    data.append("banner", e.target.files[0]);

    try {
      const response = await api.post("/files", data);

      setFile(response.data.id);
      setPreview(`http://localhost:3333/uploads/${response.data.path}`);

      console.log(preview);
    } catch (error) {
      toast.error("Internal Server Error", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  async function handleSubmit(data) {
    const { title, description, place } = data;
    try {
      if (id) {
        await api.put(`/meetups/${id}`, {
          title,
          description,
          place,
          date,
          file_id: file || informations.file_id
        });
        toast.info("Meetup editado com sucesso !", {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        await api.post("/meetups", {
          title,
          description,
          place,
          date,
          file_id: file
        });

        toast.info("Meetup criado com sucesso !", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      history.push("/");
    } catch (error) {
      toast.error("Internal Server Error", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  return (
    <Container>
      <Header username={profile.username} />
      <InnerContainer>
        <label htmlFor="banner">
          <img src={preview} alt="Banner Preview" />
          <input
            type="file"
            name="banner"
            id="banner"
            data-file={file}
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <Form onSubmit={handleSubmit} initialData={informations}>
          <Input name="title" type="text" placeholder="Titulo do meetup" />
          <Input
            name="description"
            type="text"
            placeholder="Descrição completa"
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <DatePicker
              minDate={new Date()}
              openToDate={
                informations ? parseISO(informations.date) : new Date()
              }
              todayButton={"Hoje"}
              selected={date}
              onChange={date => setDate(date)}
              locale="pt-BR"
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              dateFormat="Pp"
              placeholderText="Data"
            />
            <Input name="place" type="text" placeholder="Local" />
          </div>

          <ButtonContainer>
            <div />
            <SaveButton type="submit">
              <MdAddCircleOutline size={"1.5em"} />
              <strong>Salvar meetup</strong>
            </SaveButton>
          </ButtonContainer>
        </Form>
      </InnerContainer>
    </Container>
  );
}
