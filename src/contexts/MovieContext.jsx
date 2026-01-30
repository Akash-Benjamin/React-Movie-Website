import {createContext, useContext, useState, useEffect} from "React";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {}