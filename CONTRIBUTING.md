# Contributing

In this guide, you will get an overview of the contribution workflow: Going from opening an issue, resolving that issue, creating a merge request, reviewing another developer's merge request, and merging your code into the `dev` branch to finally be merged into the `main` branch.

To get an overview of the project, please read through the root [`README.md`](README.md).

## Gitpod

The application can be developed and executed using Gitpod. Use the badge in the root [`REAMDE.md`](./README.md) to launch the application using Gitpod.

Each developer is encouraged to use their IDE of choice, as long as all functionality also supports using Gitpod.

## Milestones

Milestones on GitLab are used to monitor the sprints, and thus link issues to each sprint.

## Issue tracking

### Templates

GitLab issue templates have been set up to streamline the process of creating a new issue.

An issue can either be a [**Feature Request**](.gitlab/issue_templates/feature.md), a [**Bug**](.gitlab/issue_templates/bug.md) or **Uncategorized**. Please inspect the raw Markdown code when viewing these templates.

The issue templates are adapted to resemble an informal user story.

### Labels

Each issue is assigned one or multiple labels. An overview of our custom project labels can be found
in `Issues -> Labels` on GitLab. The labels serve to prioritze, scope and categorize the issues.

### Connecting issues to merge requests

An issue should always be closed by a merge request, unless the issue is obviously not connected to part of the code base.

### GitLab boards

An overview of the state of an issue (backlog, in progress, done, etc...) can be found in `Issues -> Boards`.

### Scope of an issue

An issue should not be too large. We seek to scope an issue to a maximum work length of 12 hours. If the issue must be larger than that, the issue must have a checklist of subtasks.

#### Example: Scope of an issue

Issue name: **#10 - Create login page**

- [x] Make login view
- [ ] Request authentication from backend
- [ ] etc...

## Commit Culture

In short, a commit should be short, concise and descriptive.

### Commit title

For some commits, only a commit title is sufficient. Oftentimes, adding a description explaining what is done, and why it is done is helpful for new developers joining the project.

Commit messages must be categorized. One should not blend or mix categories in one single commit, in order to maintain a clean Git timeline and to increase readability for the developer.

#### Example

The following is an example of a good commit.

```txt
# Title

docs: Add CONTRIBUTING.md

# Description

WHAT: Add documentation for contribution to the code base

WHY: New developers should quickly be able to contribute new code to our code base
```

## Branches and merge requests

### Naming

Branch names should be clear and concise, and be marked with the id number of the issue it resolves.
Example: `feat/#10-login-page`.

### Description

The description of a merge request includes a **Changelog / Summary** of the new functionality added. Optionally, a short description about how to test the new functionality can be added in order to help the code reviewer.

### Squash and merge

Before merging, the commits in the branch to merge must be squashed. This cleans up the Git timeline.

### Important to note

All origin branches are deleted after merging in order to keep the Git timeline clean. This causes individual commits per branch to be squashed, and thus not visible from the main branch.

If you wish to inspect individual commits per merged branch, please navigate to the merge request in the remote repository on GitLab.
