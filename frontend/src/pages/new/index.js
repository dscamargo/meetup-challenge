import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "unform";
import DatePicker, { registerLocale } from "react-datepicker";
import { MdAddCircleOutline, MdAddAPhoto } from "react-icons/md";
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
import history from "../../services/history";

registerLocale("pt-BR", ptBR);

export default function New({ match }) {
  const profile = useSelector(state => state.user.profile);
  const { id } = match.params;
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [informations, setInformations] = useState(null);

  useEffect(() => {
    async function getMeetupInformations() {
      if (id) {
        const response = await api.get(`/meetups/${id}`);

        setInformations(response.data);
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
        <input
          name="banner"
          id="banner"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label htmlFor="banner">
          <div>
            <MdAddAPhoto size={"3em"} />
            <p>Selecionar imagem</p>
          </div>
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
              openToDate={new Date()}
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
