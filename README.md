<p align="center">
  <a href="https://backoffice.co.th">
   <img src="./apps/backoffice/public/images/backoffice.png" alt="Back Office — The infrastructure of your business">
  </a>
  <h1 align="center">Back Office</h1>
  <p align="center">
    The Open Infrastructure for Your Business.
    <br />
    <a href="https://backoffice.co.th"><strong>Learn more »</strong></a>
  </p>
</p>

> [!WARNING]
> Back Office is currently in Development: Please be aware that the project is still in progress. You may encounter breaking changes and bugs as we continue to improve and expand the tool.

> [!NOTE]
> All your business tools in one place — Simple. Flexible. Free.

Back Office is a suite of open-source business tools designed to help you run your company with ease. It's fully customizable to fit your unique business needs and is suitable for businesses of all sizes — from startups to growing enterprises. Best of all, it's completely free.

## Features

- 📦 Modular & customizable business components
- 🛠️ Built with open-source technologies
- 💼 Designed for startups, SMEs, and growing businesses
- 🌐 Self-host or deploy in the cloud
- 💸 100% free to use

## Project Structure

```
backoffice/
├── apps/                    # Application implementations
│   ├── backoffice/          # Main web application
│   │   ├── app/             # Next.js app directory
│   │   └── public/          # Static assets
│   │
│   └── docs/                # Documentation site
│       ├── app/             # Next.js app directory
│       ├── content/         # Documentation content
│       │   ├── guides/      # User guides and tutorials
│       │   ├── api/         # API documentation
│       │   └── modules/     # Module documentation
│       └── theme.config.js  # Fumadocs configuration
│
├── packages/                # Shared packages
│   ├── core/                # Core framework and utilities
│   ├── auth/                # Authentication and authorization
│   ├── ui/                  # Shared UI components
│   └── modules/             # Business modules
│       ├── company/         # Company management module
│       ├── users/           # User management module
│       └── ...
```

The project follows a monorepo structure using pnpm workspaces:

- **apps**: Contains the main application and documentation site
- **apps/docs**: Documentation built with Fumadocs, featuring:
  - Interactive code examples
  - API references
  - Module documentation
  - Search functionality
- **packages/core**: Core framework, types, and utilities
- **packages/auth**: Authentication, authorization, and session management
- **packages/ui**: Reusable UI components and design system
- **packages/modules**: Business logic modules that can be composed together

## Modules

| Module                                          | Description                                              | Type | Status      |
| ----------------------------------------------- | -------------------------------------------------------- | ---- | ----------- |
| [company](/packages//modules/company/README.md) | Manage company information, settings, and branding       | Core | In-Progress |
| [users](/packages/modules/users/README.md)      | Manage users, roles, and permissions across the platform | Core | In-Progress |

## Databases

Currently, we support 3 databases

- PostgeSQL (reccommended)
- MySQL
- SQLite

## Contributing

We welcome contributions! Please check out the [CONTRIBUTING.md](CONTRIBUTING.md) guide to get started.

## License

This project is licensed under the Apache License 2.0.
