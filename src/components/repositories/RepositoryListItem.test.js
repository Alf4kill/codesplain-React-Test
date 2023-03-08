import { render, screen, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";
import { async } from "validate.js";

// other way to deal with warning is just to mock the import
// jest.mock("../tree/FileIcon.js", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "Facebook/react",
    language: "Javascript",
    description: "a js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return { repository };
}

test("shows a link to github repository", async () => {
  const { repository } = renderComponent();
  // best way to deal with the warning \/
  await screen.findByRole("img", { name: "Javascript" });
  // best way /\

  const link = screen.getByRole("link", {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute("href", repository.html_url);

  //last option, not recommended \/
  // await act(async () => {
  //   await pause();
  // });
});
// last option and is not recommended \/
// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

test("shows fileicon with the correct icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "Javascript" });

  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();
  await screen.findByRole("img", { name: "Javascript" });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });
  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
