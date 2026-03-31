# Contributing Guidelines

Thank you for your interest in contributing to the ERP Company System! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/ERP-Company.git
   cd ERP-Company
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/Mostafa-SAID7/ERP-Company.git
   ```
4. Create a new branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Make your changes and test them locally

## Code Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types for all functions and components
- Avoid using `any` type
- Use interfaces for object shapes

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Add PropTypes or TypeScript interfaces

### Naming Conventions
- Components: PascalCase (e.g., `UserForm`)
- Functions: camelCase (e.g., `getUserData`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_USERS`)
- Files: Match the exported component name

### Code Style
- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons at the end of statements
- Use arrow functions for callbacks
- Keep lines under 100 characters when possible

### Comments
- Write clear, concise comments
- Explain the "why", not the "what"
- Use JSDoc for functions and components
- Keep comments up-to-date with code changes

## Commit Guidelines

### Commit Messages
Follow the conventional commits format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

**Examples:**
```
feat(finance): add journal entry validation
fix(inventory): correct stock calculation
docs(readme): update installation instructions
```

### Commit Best Practices
- Make small, focused commits
- Commit frequently
- Write descriptive commit messages
- Don't commit sensitive information
- Review your changes before committing

## Pull Request Process

1. Update your branch with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request on GitHub with:
   - Clear title describing the changes
   - Detailed description of what was changed and why
   - Reference to any related issues
   - Screenshots for UI changes

4. Ensure all checks pass:
   - Code quality checks (ESLint)
   - Type checking (TypeScript)
   - Tests (if applicable)

5. Address any review comments
6. Wait for approval from maintainers

## Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
- Write tests for new features
- Aim for high code coverage
- Test edge cases and error scenarios
- Use descriptive test names

### Code Quality
```bash
npm run lint
```

Fix any linting issues before submitting a PR.

## Documentation

- Update README.md if adding new features
- Add comments to complex code
- Update relevant documentation files
- Include examples for new features

## Types of Contributions

### Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide expected vs actual behavior
- Include screenshots if applicable

### Feature Requests
- Use the feature request template
- Explain the use case
- Describe the expected behavior
- Provide examples if possible

### Documentation
- Fix typos and improve clarity
- Add missing documentation
- Provide examples
- Update outdated information

### Code Improvements
- Refactor for better readability
- Improve performance
- Reduce code duplication
- Add type safety

## Review Process

### What Reviewers Look For
- Code quality and style
- Adherence to project standards
- Proper error handling
- Performance considerations
- Security implications
- Test coverage
- Documentation completeness

### Responding to Reviews
- Be open to feedback
- Ask questions if unclear
- Make requested changes
- Explain your reasoning if you disagree
- Thank reviewers for their time

## Licensing

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

## Code of Conduct

Please note that this project is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Questions?

If you have questions about contributing, please:
- Check existing documentation
- Search for similar issues
- Ask in discussions
- Contact us at [contact@we3ds.com](mailto:contact@we3ds.com)

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

Thank you for contributing to the ERP Company System!

---

**We3DS** - Building Enterprise Solutions
