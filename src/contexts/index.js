import React from "react";
import { langEnum, themeEnum } from '../enums';

export const UserContext = React.createContext({});

export const ThemeContext = React.createContext(themeEnum.LIGHT);

export const LangContext = React.createContext(langEnum[0]);
