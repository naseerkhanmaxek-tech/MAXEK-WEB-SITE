# CLAUDE.md — MAXEK Website Working Rules

## PROJECT
MAXEK India Private Limited corporate website.

## WORKING DIRECTORY
The current VS Code workspace/project root.

## CORE DEVELOPMENT RULES

1. Always inspect the existing implementation before modifying it.

2. Never redesign, restructure, rename, delete, or modify unrelated sections, components, routes, styles, assets, or functionality unless explicitly requested.

3. Make the smallest necessary change required to complete each task.

4. Preserve the existing MAXEK visual identity and premium corporate design language.

   Brand colours:
   - Dark Navy: #0B1C38
   - MAXEK Red: #CC1717
   - White: #FFFFFF

5. Preserve existing responsive behaviour unless the requested change specifically requires modification.

6. Do not modify environment files, credentials, API keys, deployment configuration, Git configuration, or secrets.

7. Never modify:
   - .env
   - .env.*
   - node_modules
   - build output
   - .git

   unless explicitly instructed otherwise.

8. Before editing code:
   - identify the relevant files;
   - inspect their current implementation;
   - understand dependencies;
   - explain briefly what is about to change.

9. Do not start editing immediately when a request is ambiguous. Ask for clarification when an important design or functional requirement is unclear.

10. After making changes:
    - report every file modified;
    - summarize exactly what changed;
    - mention anything that may affect other parts of the website;
    - run appropriate validation/build checks when practical.

11. Do not silently fix unrelated warnings or errors.

12. Do not install packages or dependencies unless they are genuinely required. Ask before adding a new dependency.

13. Preserve existing content unless specifically requested to change it.

14. Preserve existing animations unless specifically requested to change or remove them.

15. For UI changes, prioritize:
    - professional corporate appearance;
    - clean spacing;
    - readability;
    - subtle premium interactions;
    - performance;
    - accessibility;
    - responsive behaviour.

    Avoid excessive animations, flashy effects, heavy gradients, or effects that reduce readability.

16. When modifying shared components, first determine whether the change will affect other pages. Avoid global changes when the requirement is page-specific.

17. Never run destructive commands without asking first.

18. GIT SAFETY:
    Do not automatically:
    - git commit
    - git push
    - git pull
    - git reset
    - git rebase
    - change branches
    - create/delete branches
    - modify remotes

    Only perform Git operations when explicitly requested.

19. Never push anything to GitHub without explicit approval.

20. When a task is finished, stop and wait for review rather than beginning additional improvements.
