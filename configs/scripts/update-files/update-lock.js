const fs = require('fs');
const path = require('path');

const provider = process.argv[2]; // 'postgresql' ou 'cockroachdb'
const migrationPath = process.argv[3]; // Caminho do diretório de migrações

if (!provider || !migrationPath) {
  console.error('Uso: node update-lock.js <provider> <migrationPath>');
  console.error(
    'Exemplo: node update-lock.js postgresql ./prisma/migrations/dev'
  );
  process.exit(1);
}

// Caminho do arquivo migration_lock.toml
const lockFilePath = path.resolve(
  __dirname,
  migrationPath,
  'migration_lock.toml'
);

if (!fs.existsSync(lockFilePath)) {
  console.error(
    `Erro: Arquivo migration_lock.toml não encontrado em ${lockFilePath}`
  );
  process.exit(1);
}

// Lê o arquivo migration_lock.toml
const lockFileContent = fs.readFileSync(lockFilePath, 'utf-8');

// Substitui o valor do provider
const updatedLockFile = lockFileContent.replace(
  /provider = ".*"/,
  `provider = "${provider}"`
);

// Salva o arquivo atualizado
fs.writeFileSync(lockFilePath, updatedLockFile, 'utf-8');

console.log(
  `migration_lock.toml atualizado com provider "${provider}" no diretório ${migrationPath}`
);
