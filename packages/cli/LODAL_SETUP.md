## 1. Build the CLI

```bash
pnpm build
```

This should create the `dist/` folder containing the compiled CLI.

---

## 2. Link the CLI Globally

Run the following command inside the `harukit` root directory:

```bash
pnpm link --global   
```

This will symlink `harukit` globally on your machine.

✅ You can now run:

```bash
harukit --help
```

---

## 3. Use Harukit in Another Local Project

Navigate to your **other project**:

```bash
cd ../my-other-project
```

You can now use the CLI directly:

```bash
harukit init
harukit add button
harukit list
```

---

## 4. Unlink (Optional)

If you want to remove the local symlink:

```bash
pnpm unlink -g harukit
```

And inside your `harukit` repo:

```bash
pnpm unlink
```

---

## 5. Notes

- Each time you change Harukit CLI code, run:

```bash
pnpm build
```
