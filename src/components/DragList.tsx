import React, { useState, useCallback } from "react";
import { range, inRange } from "lodash";
import Draggable from "./Draggable";
import { DraggableItem } from "./DraggableItem";
import { Container } from "./Container";

const MAX = 5;
const HEIGHT = 80;

interface AppState {
  order: number[];
  dragOrder: number[];
  draggedIndex: number | null;
}

export interface Translation {
  x: number;
  y: number;
}

export const DragList = () => {
  const items: number[] = range(MAX);
  const [state, setState] = useState<AppState>({
    order: items,
    dragOrder: items,
    draggedIndex: null,
  });

  const handleDrag = useCallback(
    ({ translation, id }: { translation: Translation; id: number }) => {
      const delta: number = Math.round(translation.y / HEIGHT);
      const index: number = state.order.indexOf(id);
      const dragOrder: number[] = state.order.filter((index) => index !== id);

      if (!inRange(index + delta, 0, items.length)) {
        return;
      }

      dragOrder.splice(index + delta, 0, id);

      setState((state) => ({
        ...state,
        draggedIndex: id,
        dragOrder,
      }));
    },
    [state.order, items.length]
  );

  const handleDragEnd = useCallback(() => {
    setState((state) => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null,
    }));
  }, []);
  return (
    <Container>
      {items.map((index) => {
        const isDragging: boolean = Boolean(state.draggedIndex === index);
        const top: number = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop: number = state.order.indexOf(index) * (HEIGHT + 10);

        return (
          <Draggable
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <DraggableItem
              isDragging={isDragging}
              top={isDragging ? draggedTop : top}
            >
              {index}
            </DraggableItem>
          </Draggable>
        );
      })}
    </Container>
  );
};
