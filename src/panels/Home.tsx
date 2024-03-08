// Home.tsx
import React from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  ButtonGroup,
  Avatar,
} from "@vkontakte/vkui";
import { GoFunctionProp, NavProp, UserInfo } from "../types";
import { useEnableSwipeBack } from "@vkontakte/vk-mini-apps-router";
//import { NasaItem } from "../components";
import { useSelector } from "react-redux";
import { Case } from "../components";
import { Pdf } from "../components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CardItem } from "../types";

type HomeProps = NavProp &
  GoFunctionProp & {
    fetchedUser: UserInfo;
  };

export const Home = ({ nav, go, fetchedUser }: HomeProps) => {
  useEnableSwipeBack();

  const query = useSelector(
    (state: { user: { query: string } }) => state.user.query,
  ) as string;

  const cardItem: CardItem = {
    text: "Текст1",
    geolocation: "11",
    dateCreated: "2022-01-01",
    width: 10,
    height: 20,
  };

  return (
    <Panel nav={nav}>
      <PanelHeader>Главная страница</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">Данные профиля</Header>}>
          <Cell
            before={
              fetchedUser.photo_max_orig ? (
                <Avatar src={fetchedUser.photo_max_orig} />
              ) : null
            }
            subhead={`${
              fetchedUser.country && fetchedUser.country.title
                ? fetchedUser.country.title
                : ""
            } ${","} ${
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }`}
            subtitle={`${
              fetchedUser.is_closed ? "Закрытый профиль" : "Открытый профиль"
            } ${
              fetchedUser.bdate_visibility == 0
                ? "Дата рождения скрыта"
                : "Дата рождения открыта"
            }
            ${fetchedUser.sex == "1" ? "Пол Ж" : "Пол М"}`}
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      <Group>
        <ButtonGroup stretched mode="vertical">
          <ButtonGroup mode="horizontal" stretched>
            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => go("/onboarding_1")}
            >
              Показываем только при первом старте
            </Button>
            <Button stretched size="l" mode="secondary">
              {query ? query : ""}
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Group>
      <Group>
        <Case></Case>
      </Group>
      <Group>
        <PDFDownloadLink document={<Pdf {...cardItem} />} fileName="list.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Pdf"
          }
        </PDFDownloadLink>
      </Group>
    </Panel>
  );
};
