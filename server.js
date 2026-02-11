const app = require('./app');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Pal Brothers BFF at http://localhost:${PORT}`);
});
