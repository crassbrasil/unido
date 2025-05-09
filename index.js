// Importando o Express
const express = require('express');
const axios = require('axios');

// Inicializando a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar requisições JSON
app.use(express.json());

// Suas chaves da Nexus Tech
const PUBLIC_KEY = 'pk_live_FUF01RbBgi0V4BXctjUyLEcqFIDs3d';
const SECRET_KEY = 'sk_live_n2DcGrRa4ZpxPmtf3QAHszDhCeT2iYj6J7rs6LwawK';
const NEXUS_API_URL = 'https://api.nexustech.com.br/pix';

// Rota POST para gerar Pix
app.post('/pix', async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Valor inválido para o Pix.' });
  }

  try {
    const response = await axios.post(
      NEXUS_API_URL,
      { amount, publicKey: PUBLIC_KEY },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SECRET_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao conectar com a API Nexus Tech.',
      details: error.message
    });
  }
});

// Rota GET básica para testar o servidor
app.get('/', (req, res) => {
  res.send('API Pix em execução!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
