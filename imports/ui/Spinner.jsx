import React from "react";
import * as SC from './Spinner.sc';

export const Spinner = ({ message = "Завантаження..." }) => (
  <SC.Container>
    <SC.SpinnerRing />
    <SC.Label>{message}</SC.Label>
  </SC.Container>
);
