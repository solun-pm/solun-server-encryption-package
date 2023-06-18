# **Workflow:**

Prepare the Build:

```
npm run prepare
```

Then commit the changes with or via VSCode GUI:
```
git add .
git commit -S -m "Commit message"
```

Then add a new version with
```
npm version patch
```
Then publish to NPM with
```
npm publish
```