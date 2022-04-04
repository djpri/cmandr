import { CategoryReadDto } from "models/category";
import { FC } from "react";

interface IProps {
  items: CategoryReadDto[];
}

// https://react-dnd.github.io/react-dnd/examples/sortable/cancel-on-drop-outside

export const Container: FC<IProps> = ({ items }) => {
  // const [categories, setCategories] = useState(items);

  // const findCard = useCallback(
  //   (id: string) => {
  //     const card = categories.filter((c) => `${c.id}` === id)[0] as {
  //       id: number;
  //       name: string;
  //     };
  //     return {
  //       card,
  //       index: categories.indexOf(card),
  //     };
  //   },
  //   [categories]
  // );

  // const moveCard = useCallback(
  //   (id: string, atIndex: number) => {
  //     const { card, index } = findCard(id);
  //     setCategories(
  //       update(categories, {
  //         $splice: [
  //           [index, 1],
  //           [atIndex, 0, card],
  //         ],
  //       })
  //     );
  //   },
  //   [findCard, categories, setCategories]
  // );

  // const [, drop] = useDrop(() => ({ accept: "category" }));

  // return (
  //   <div ref={drop} style={style}>
  //     {categories.map((card) => (
  //       <Card
  //         key={card.id}
  //         id={`${card.id}`}
  //         text={card.text}
  //         moveCard={moveCard}
  //         findCard={findCard}
  //       />
  //     ))}
  //   </div>
  // );
  return null;
};
