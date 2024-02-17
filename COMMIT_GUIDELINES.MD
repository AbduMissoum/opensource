# Commit Guidelines

This repository follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format to ensure clear and consistent commit messages.

## Commit Message Format

Each commit message consists of a header, a body and a footer, and should be structured as follows:

---

```
<type>: <description>
<BLANK LINE>
[optional body]
<BLANK LINE>
[optional footers]
```
---


- **Type**: Describes the purpose of the commit (e.g., feat, fix ...) Refer to [Commit Types](#commit-types) section for a full list of types.
- **Description**: A short, descriptive summary of the changes.
- **Body** (optional): A more detailed description of the changes.
- **Footer** (optional): Additional information about the commit (e.g., issues closed).

## Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **docs**: Documentation only changes
- **test**: Adding missing tests or correcting existing tests

## Examples

### Adding a new feature:

```
feat: implement JWT token generation

issue #123
```

### Fixing a bug:

```
fix: resolve issue with incorrect database query

- The "listing activated users" query was missing a join statement
- The "listing villes" query was missing a where clause

issue #123

```

### Updating documentation:

```
docs: update README

- Add instructions for running the application

issue #123

```

## Additional Notes

- **Use the footer to reference the ISSUE ticket number associated with the commit (e.g., issue #123
).**
- Use only english in commit messages.
- Keep commit messages clear and concise.
- Use present tense (e.g., "Add feature" instead of "Added feature").
- Use imperative mood (e.g., "Fix bug" instead of "Fixing bug").
- Separate the body lines from the header and footer with a blank line.
- Use the body to explain what and why and not how.