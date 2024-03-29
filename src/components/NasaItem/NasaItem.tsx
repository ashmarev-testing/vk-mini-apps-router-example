//NasaItem.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardGrid, ContentCard } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "@vkontakte/vkui/dist/vkui.css";
// redux-toolkit запись
import { useDispatch } from "react-redux";
import { setQuery } from "../../store/slice";
//
// redux-toolkit чтение
import { useSelector } from "react-redux";
//

export type NasaItemData = {
  href: string;
  data: {
    center: string;
    title: string;
    nasa_id: string;
    date_created: string;
    keywords: string[];
    media_type: string;
    description_508: string;
    secondary_creator: string;
    description: string;
  }[];
  links: {
    href: string;
    rel: string;
    render: string;
  }[];
};

export const NasaItem: React.FC = () => {
  const [arr, setArr] = useState<NasaItemData[] | null>();
  const routeNavigator = useRouteNavigator();
  // redux-toolkit запись
  const dispatch = useDispatch();
  //
  // redux-toolkit чтение
  const query = useSelector(
    (state: { user: { query: string } }) => state.user.query,
  ) as string;
  if (query) {
    console.log("NasaItem 46", query);
  }
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        // чтобы не искать меньше 4 символов
        if (query.length > 3) {
          const { data } = await axios.get(
            `https://images-api.nasa.gov/search?q=${query}`,
          );
          // сортировка
          data.collection.items.sort(
            (a: NasaItemData, b: NasaItemData) =>
              new Date(b.data[0].date_created).getTime() -
              new Date(a.data[0].date_created).getTime(),
          );

          setArr(data.collection.items);
        } else {
          setArr([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  const handleClick = (itemId: string) => {
    routeNavigator.push(`/${"empty?nasaId="}${itemId}`);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder={"..."}
          className={"input"}
          //onChange={(event) => setQuery(event.target.value)}
          onChange={(event) => dispatch(setQuery(event.target.value))}
          value={query as string}
        />
      </div>
      <CardGrid size="m">
        {arr && arr.length > 0
          ? arr.map((item, index) =>
              item.data[0].media_type === "image" ? (
                <div
                  id={"Card " + item.data[0].nasa_id}
                  key={index}
                  onClick={() => handleClick(item.data[0].nasa_id)}
                >
                  <ContentCard
                    disabled
                    src={item.links ? item.links[0].href : ""}
                    //alt={item.data[0].description}
                    header={item.data[0].title}
                    subtitle={item.data[0].date_created}
                    //text={item.data[0].description}
                    caption={item.data[0].secondary_creator}
                    maxHeight={200}
                  />
                </div>
              ) : (
                ""
              ),
            )
          : ""}
      </CardGrid>
    </>
  );
};
