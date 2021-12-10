import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import SearchForm from "./components/SearchForm";
import axios from "axios";
import App, { storiesReducer } from "./App";
import { Item } from "./components/List";

describe("Sample test suite", () => {
  test("expecting true to be true", () => {
    const isCold = true;
    expect(isCold).toBe(true);
  });
});

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("Test stories reducer", () => {
  test("remove story from reducer", () => {
    const state = { data: stories, isLoading: false, isError: false };
    const action = { type: "REMOVE_STORY", payload: storyTwo.objectID };
    const result = storiesReducer(state, action);
    const newState = { data: [storyOne], isLoading: false, isError: false };
    expect(result).toStrictEqual(newState);
  });
});

describe("Item component", () => {
  test("render item component", () => {
    render(<Item item={storyOne} onDelete={() => {}} />);
    screen.debug();
  });

  test("assert if title exists", () => {
    render(<Item item={storyOne} onDelete={() => {}} />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("button exists", () => {
    render(<Item item={storyOne} onDelete={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("handle delete click", () => {
    const handleDeleteItem = jest.fn();
    render(<Item item={storyOne} onDelete={handleDeleteItem} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleDeleteItem).toHaveBeenCalledTimes(1);
  });
});

describe("Search form", () => {
  test("render the search form", () => {
    const searchProps = {
      searchTerm: "React",
      onSearch: jest.fn(),
      onSubmit: jest.fn(),
    };

    render(<SearchForm {...searchProps} />);
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue("React"), {
      target: { value: "Redux" },
    });
    expect(searchProps.onSearch).toHaveBeenCalledTimes(1);
    fireEvent.submit(screen.getByRole("button"));
    expect(searchProps.onSubmit).toHaveBeenCalledTimes(1);

    screen.debug();
    expect(screen.getByDisplayValue("Redux")).toBeInTheDocument();
  });

  test("snapshot testing", () => {
    const searchProps = {
      searchTerm: "React",
      onSearch: jest.fn(),
      onSubmit: jest.fn(),
    };

    const { container } = render(<SearchForm {...searchProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

//INTEGRATION TESTING

jest.mock("axios");

describe("Integration testing of axios", () => {
  test("test loading data", async () => {
    const resolvedPromise = Promise.resolve({ data: { hits: stories } });
    axios.get.mockImplementationOnce(() => resolvedPromise);
    render(<App />);
    screen.debug();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await act(() => resolvedPromise);
    screen.debug();
    expect(screen.queryByText(/Loading/i)).toBeNull();
  });

  test("fail loading data", async () => {
    const rejectedPromise = Promise.reject();
    axios.get.mockImplementationOnce(() => rejectedPromise);

    render(<App />);
    try {
      await act(() => rejectedPromise);
    } catch {
      expect(screen.getByText(/went wrong/i)).toBeInTheDocument();
    }
  });
});
