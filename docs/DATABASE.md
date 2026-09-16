# Database

Collections:
- users
- refreshTokens
- links
- clickEvents
- bioPages

Indexes:
- users.email unique
- users.username unique
- links.shortCode unique
- links.customSlug unique sparse
- links.userId + createdAt
- clickEvents.linkId + timestamp
- bioPages.username unique
