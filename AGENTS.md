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
- Orders live in localStorage key `kalandra_orders` (seeded lazily, synced via the `kalandra:orders` event and `storage` listener); every checkout path records there and admin status edits write back to it.
- Carts are stored per owner under `kalandra-cart-<email|guestId>`; the admin role has no cart and `addToCart` is a no-op for it.
- Cart writes must bind owner and contents atomically and persist at mutation time, preventing an owner transition from overwriting another cart.
- Browser-local sessions use sessionStorage separately from shared store data, preventing another tab from inheriting an admin session; wait for hydration before deciding admin access.
- Simulated recovery validates OTP and password in the store and reuses the same wizard for account and admin dialogs; this is not production authentication.
- `/admin` is guarded in the route component: non-admins are redirected to `/` with a denial toast, and the header ShieldCheck icon opens an admin-only login dialog instead of linking directly.
- Store settings and category CRUD use the existing shared StoreProvider with hydrated localStorage persistence and nested legacy-settings migration; this browser-local architecture is explicitly requested and must not be presented as multi-user administration.
- Seed orders are created lazily when initializing state, not during module evaluation, to keep imports safe for the deployed Worker runtime.

- Keep product food classification explicit and default unknown products to no halal badge; content exclusions override a conflicting classification.
- Apply versioned catalog migrations only during hydration, preserving existing images and customized data and never resurrecting deleted additions on later mounts.
- Centralize commercial catalog, promotions, occasion/budget definitions, articles, card templates and add-ons in src/data/floristData.ts; use type-only data imports to avoid circular runtime dependencies.
- Preserve optional cardTemplate on cart/order items and default missing values to the classic design so existing orders remain readable.
- Flash-sale cards derive discounts from current catalog prices and stock, and the countdown targets the next Jakarta midnight without fetching or mutating stock.
