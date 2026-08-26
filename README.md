# Bac II Results - GitHub Pages

This folder is a standalone static website. It requires no server, database,
login, or verification screen.

## Publish on GitHub

1. Create an empty GitHub repository.
2. Push the contents of this `github-pages` folder to its `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. The included workflow publishes the site automatically.

The public URL will normally be:

`https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

## Connect it to Telegram

In BotFather, open your bot, choose **Bot Settings → Menu Button → Configure
menu button**, and paste the public GitHub Pages URL.

## Update result data

Replace `site/results.json` with the latest extracted JSON and push the change.
GitHub Pages will redeploy automatically.
