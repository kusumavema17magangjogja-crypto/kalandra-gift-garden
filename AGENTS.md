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

- Storefront cart checkout builds a WhatsApp order from cart contents without consulting account state; optional account and admin navigation must remain separate from purchasing.
- Store settings and category CRUD use the existing shared StoreProvider with hydrated localStorage persistence and nested legacy-settings migration; this browser-local architecture is explicitly requested and must not be presented as multi-user administration.
- Seed orders are created lazily when initializing state, not during module evaluation, to keep imports safe for the deployed Worker runtime.
