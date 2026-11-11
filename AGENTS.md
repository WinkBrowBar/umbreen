<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Home page sections live in `src/components/site/` (one component per section); styles stay in `src/styles.css`.
- Images are plain files in `public/images/` (umbreen-00.png … umbreen-18.jpeg), referenced as `/images/<file>`.
- Extra routes: `/about`, `/privacy-policy`, `/terms-of-service`.
