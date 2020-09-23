import styled from "styled-components";

interface DraggableItemProps {
  isDragging: boolean;
  top: number;
}

export const DraggableItem = styled.div<DraggableItemProps>`
  transition: ${({ isDragging }) => (isDragging ? "none" : "all 500ms")};
  width: 300px;
  user-select: none;
  height: 80px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ top }) => 100 + top}px;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`;
