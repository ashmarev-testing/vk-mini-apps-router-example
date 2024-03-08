// Home.tsx
import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { CardItem } from "../../types";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    margin: 10, // отступ слева
    flexDirection: "row", // направление в строку
    flexWrap: "wrap", // перенос на следующую строку
    flexStart: 0, // отступ слева
    backgroundColor: "#FFFFFF", // цвет фона
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 5,
  },
});

export const Pdf = (props: CardItem) => {
  let numbersInRow: number = 0;
  let numbersInColumn: number = 0;
  let numbersOfCard: number = 0;

  if (
    props.width < 277 &&
    props.height < 200 &&
    props.width > props.height &&
    props.width > 0 &&
    props.height > 0
  ) {
    numbersInRow = 277 / props.width;
    console.log(numbersInRow);
    numbersInColumn = 200 / props.height;
    console.log(numbersInColumn);
    numbersOfCard = Math.floor(numbersInRow * numbersInColumn);
    console.log(numbersOfCard);
  }

  const stylesCard = StyleSheet.create({
    card: {
      margin: 0,
      padding: 0,
      borderWidth: 0.5,
      width: props.width * 2.834, // из mm в pt
      height: props.height * 2.834, // из mm в pt
    },
  });

  const DocData = () => (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {Array.from({ length: numbersOfCard }).map((_, index) => (
          <View style={stylesCard.card} key={index}>
            <Text style={styles.text}>{props.text}</Text>
            <Text style={styles.text}>{props.geolocation}</Text>
            <Text style={styles.text}>{props.dateCreated}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
  return <DocData />;
};
