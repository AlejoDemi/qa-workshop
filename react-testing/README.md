# Unit Testing in React

[Presentation](https://docs.google.com/presentation/d/1PVxCDH-a2mXHBN3-cwcKb2b3Di2nOSu9mpJ9GPahMMA/edit?usp=sharing)

## Testing stack

### [Vitest](https://vitest.dev/)

Test runner.

### [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

Library that facilitates testing React component without having to deal with instances of rendered React components, but actual DOM nodes.

### [msw](https://mswjs.io/)

API mocking library for browser and Node.js. It lets you intercept outgoing requests, observe them, and respond to them using mocked responses.

# Project description

There are 3 main routes managed by [React Router](https://reactrouter.com/en/main).

- `Counter`.
- `Posts`.
- `Settings`.

`Posts` interacts with a public API, https://jsonplaceholder.typicode.com/posts, to retrieve a list of posts and also posts by id.

Network requests are handled using a combination of [axios](https://axios-http.com/) and [React Query](https://tanstack.com/query/latest/docs/framework/react/overview).

Components are mostly styled out of the box using [shadcn/ui](https://ui.shadcn.com/).

The `test` directory contains some utilities and configuration, including a `setup.js` file which is referenced in `vitest.config.js`.

# Running the project

## Install dependencies

```
npm install
```

## Running the project

```
npm dev
```

## Running tests

```
npm test
```

You can use these commands as well:

- `npm test Counter` -> runs test for `Counter` component, by default in `watch` mode. You can provide the exact path or just a string that matches with the file that you want to test.
- `npm test Counter -- --coverage` -> runs test for `Counter` component in `watch` mode and also provides coverage metrics. 
- `npm coverage` -> runs all the tests within the project in `watch` mode and provides coverage metrics.

# Tasks

## Task #1: test the usePost hook

**Acceptance criteria**

1) Include a test that intercepts the post by id request and assert the returned data has the correct structure.

2) Include a test that covers passing extra arguments to usePost (e.g. when passing `enabled = true`, assert that the useQuery hook is called with an object that contains `enabled: true`).

## Task #2: test the Post component

**Acceptance criteria**

1) Include at least one snapshot.

2) The copy to clipboard functionality must be fully tested.

## Task #3: add test cases to cover client-side validation errors on the AccountTab component

You can remove the default values if needed (name `Cianca` and username `dinos1337`).
Also feel free to change one of the inputs to be of another type, such as `email`, or to add any other inputs and validators.

**Acceptance criteria**

1) Use `fireEvent` or `userEvent` to fill input values.

Take into account that validation errors will appear once you submit AND form validation happens asynchronously.

## Task #4: add form validation to PasswordTab component and test it

**Acceptance criteria**

1) Add form validation that makes sense, as a minimum:

- `New password` can't be equal to `Current password`.
- `New password` must match the `Repeat new password`.

To build the form and the validation schema, you can follow a similar approach as in the AccountTab component.

2) When the form has no errors and is submitted, show a toast with:

- Title: `Success`.
- Text: `Password changed`.

3) Add tests aiming to cover all the functionality.

## Delivery terms

To complete the tasks, go ahead and fork this repository.
After finishing them, you should share the repository to @nicolasulmete on GitLab or @nulmete on GitHub.
Don't forget to send a message to him on Slack after finishing!
Good luck!