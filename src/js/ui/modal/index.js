import { $ } from "../../utils/DOM.js";

export const onModalShow = () => {
  $(".modal").classList.add("open");
};

export const onModalClose = () => {
  $(".modal").classList.remove("open");
};

$(".modal-trigger-btn").addEventListener("click", onModalShow);
$(".modal-close").addEventListener("click", onModalClose);
