import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import { MdAddCircleOutline } from "react-icons/md";
import { parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { toast } from "react-toastify";
import * as Yup from "yup";

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
  const schema = Yup.object().shape({
    title: Yup.string().required("O titulo é obrigatório."),
    description: Yup.string().required("A descrição é obrigatória."),
    place: Yup.string().required("A endereço é obrigatório."),
    date: Yup.date().required("A data do evento é obrigatória.")
  });

  const profile = useSelector(state => state.user.profile);
  const { id } = match.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [informations, setInformations] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPreview(BannerDefault);
    async function getMeetupInformations() {
      if (id) {
        const response = await api.get(`/meetups/${id}`);

        setInformations(response.data);

        setTitle(response.data.title);
        setDescription(response.data.description);
        setPlace(response.data.place);
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
    } catch (error) {
      toast.error("Internal Server Error", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  async function handleSubmit() {
    try {
      if (!(await schema.isValid({ title, description, place, date }))) {
        toast.error("Verifique os campos e tente novamente. !", {
          position: toast.POSITION.TOP_RIGHT
        });

        return;
      }

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

        <input
          name="title"
          type="text"
          placeholder="Titulo do meetup"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          name="description"
          type="text"
          placeholder="Descrição completa"
          onChange={e => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <DatePicker
            minDate={new Date()}
            openToDate={informations ? parseISO(informations.date) : new Date()}
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
          <input
            name="place"
            type="text"
            placeholder="Local"
            onChange={e => setPlace(e.target.value)}
            value={place}
          />
        </div>

        <ButtonContainer>
          <div />
          <SaveButton type="button" onClick={handleSubmit}>
            <MdAddCircleOutline size={"1.5em"} />
            <strong>Salvar meetup</strong>
          </SaveButton>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
}
