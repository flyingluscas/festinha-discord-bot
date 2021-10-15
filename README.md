# Festinha Discord Bot

### Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Discord Token](https://www.writebots.com/discord-bot-token/)

### Executando

```bash
docker run \
  --name festinha-discord-bot \
  --env DISCORD_TOKEN=<SEU_TOKEN> \
  --restart unless-stopped \
  --detach \
  flyingluscas/festinha-discord-bot:v1.1.0
```
