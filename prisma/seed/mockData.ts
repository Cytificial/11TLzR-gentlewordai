import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9dd9b2e4-f0ab-4e7e-b983-e40c75c1e035', '1Susanna75@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=3', 'token456inv', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9582f715-0c41-42a5-aafa-5d8c789982e8', '9Aileen62@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=11', 'invitation1314', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('92a96777-b107-4d78-8a38-393c06e7aa1f', '17Leola12@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=19', '789invtoken', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('65216878-5470-44a0-988f-0cf7a27f8bf3', '25Mitchel_Bergnaum36@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=27', 'token456inv', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('afba9706-5032-4bce-a37f-35868756233e', '33Vincenzo.Streich@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', '789invtoken', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('afca26c4-125e-49df-9eb4-bd406c0909b7', '41Stephen.Johnston@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=43', 'token101112', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('44b77e26-54e1-46f5-aecd-133867a4dcc7', '49Eugene.Miller20@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=51', 'invitation1314', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1d38483f-87b5-4b5b-82fd-08f9ec18e346', '57Kathlyn.Carroll23@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv123token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('397d7bc2-a2d2-45fd-b85a-117bd5319adb', '73Vella47@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=75', 'invitation1314', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('04a41377-91d9-438d-baee-fa15c03702f3', 'Enterprise', 'Entrylevel plan with essential features', '9.99', 164, 'active');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('a25b3e7c-753b-4341-8577-e1e14e493a70', 'Starter', 'Custom solutions for large businesses', '29.99', 331, 'inactive');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('027edc90-54ff-4b5d-8b31-d2e2ebe5959c', 'Starter', 'Allinclusive package for heavy users', '99.99', 728, 'suspended');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('540ffa33-e6f6-4f7c-b338-d60666ce8d6a', 'Enterprise', 'Custom solutions for large businesses', '19.99', 442, 'pending');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('c5b1ddff-2702-44fb-89e1-5cf131432189', 'Enterprise', 'Entrylevel plan with essential features', '99.99', 793, 'archived');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('12416c80-9638-4aac-8266-86b6dbe14050', 'Pro', 'Custom solutions for large businesses', '49.99', 44, 'archived');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('122dbdea-6f85-4652-adee-0d26c540ab5a', 'Starter', 'Ideal for beginners', '99.99', 451, 'pending');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('86e24ea8-f5bb-450a-af0f-f8cc2cbf462c', 'Basic', 'Ideal for beginners', '9.99', 91, 'inactive');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('2a23054c-f6f3-4029-acb1-b83cba312cfb', 'Starter', 'Entrylevel plan with essential features', '19.99', 724, 'inactive');
INSERT INTO "Plan" ("id", "name", "description", "price", "credits", "status") VALUES ('615097e6-cd81-45c7-8d55-9a8475e7d92d', 'Enterprise', 'Ideal for beginners', '29.99', 262, 'archived');

INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('db74c648-03f3-419e-8ce6-ebde9f780862', '2024-08-08T20:48:30.833Z', '2025-03-14T01:12:38.017Z', 'pending', 'afca26c4-125e-49df-9eb4-bd406c0909b7', '122dbdea-6f85-4652-adee-0d26c540ab5a');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('b01d4676-1a5e-42c3-9da7-4c92995c211c', '2025-11-15T17:23:02.278Z', '2025-10-01T04:49:48.826Z', 'expired', '397d7bc2-a2d2-45fd-b85a-117bd5319adb', '027edc90-54ff-4b5d-8b31-d2e2ebe5959c');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('63588f01-d72c-4759-80b0-a519bb9d6967', '2025-10-09T15:46:08.908Z', '2025-04-11T07:23:19.743Z', 'canceled', 'afca26c4-125e-49df-9eb4-bd406c0909b7', '540ffa33-e6f6-4f7c-b338-d60666ce8d6a');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('9083a740-ba6e-47d3-853d-fe2b59ad990e', '2024-02-02T09:00:50.067Z', '2024-06-07T06:07:51.651Z', 'expired', '9582f715-0c41-42a5-aafa-5d8c789982e8', 'a25b3e7c-753b-4341-8577-e1e14e493a70');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('68b54bf1-a00f-4dff-abfe-251740bf7ce2', '2024-11-24T22:06:34.070Z', '2024-08-14T20:21:19.906Z', 'active', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '04a41377-91d9-438d-baee-fa15c03702f3');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('21bb0751-ba25-4539-91ba-e3affc264e9d', '2024-11-09T00:48:22.158Z', '2023-11-24T10:14:50.973Z', 'canceled', '44b77e26-54e1-46f5-aecd-133867a4dcc7', '12416c80-9638-4aac-8266-86b6dbe14050');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('583d8fd4-429f-4515-b94d-654ab5dd2f0e', '2024-12-11T19:28:08.447Z', '2024-01-07T15:19:39.963Z', 'canceled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '86e24ea8-f5bb-450a-af0f-f8cc2cbf462c');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('a123a336-227d-4f58-8610-d7ce596b3847', '2024-12-25T01:59:47.448Z', '2025-09-18T15:58:11.911Z', 'canceled', 'afba9706-5032-4bce-a37f-35868756233e', '86e24ea8-f5bb-450a-af0f-f8cc2cbf462c');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('53048024-1bc3-4fc3-8f45-66da2b103d44', '2025-07-29T14:40:55.460Z', '2024-03-30T09:19:01.154Z', 'inactive', '9582f715-0c41-42a5-aafa-5d8c789982e8', '2a23054c-f6f3-4029-acb1-b83cba312cfb');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "userId", "planId") VALUES ('c951747c-42f5-4c94-9964-773bd20e7747', '2024-04-03T00:58:39.559Z', '2025-04-12T19:38:02.667Z', 'pending', 'afba9706-5032-4bce-a37f-35868756233e', '122dbdea-6f85-4652-adee-0d26c540ab5a');

INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('b16b2757-5f1d-44cc-85d0-c3774fdfcc21', 'Travel Tips and Tricks', 'pending', '92a96777-b107-4d78-8a38-393c06e7aa1f');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('7a462df2-4972-44f8-9011-da73015cfed5', 'Understanding Quantum Physics', 'pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('b615d688-c4eb-43f9-a889-67a52dd5bf3c', 'Understanding Quantum Physics', 'pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('5257e339-616d-446a-933c-7a46d94c0f1b', 'Cooking with Seasonal Ingredients', 'active', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('9aad11d4-3bde-46f5-ad4b-4ab20dcc15c5', 'Understanding Quantum Physics', 'archived', 'afba9706-5032-4bce-a37f-35868756233e');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('128aeb00-358a-4776-bce2-b39a72c4c817', 'Understanding Quantum Physics', 'inprogress', '397d7bc2-a2d2-45fd-b85a-117bd5319adb');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('30ca8954-e50c-47e5-959e-743e9d8fcaf0', 'Travel Tips and Tricks', 'active', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('77a61772-ce70-43e7-89e4-d198d537e400', 'Understanding Quantum Physics', 'inprogress', '9dd9b2e4-f0ab-4e7e-b983-e40c75c1e035');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('eb42a61d-1caf-45f6-93ba-0d777523d5f7', 'Cooking with Seasonal Ingredients', 'inprogress', '9582f715-0c41-42a5-aafa-5d8c789982e8');
INSERT INTO "Conversation" ("id", "title", "status", "userId") VALUES ('fc9b2ff8-890f-44ce-99f1-1dc2a847029f', 'Understanding Quantum Physics', 'inprogress', '9582f715-0c41-42a5-aafa-5d8c789982e8');

INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('97ba2521-ea88-468e-8d38-29842373f329', 'What is the weather like today', 'user', 416, '9aad11d4-3bde-46f5-ad4b-4ab20dcc15c5');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('32780cf3-c137-49bf-bca9-3ec0f51f3149', 'How do I reset my password', 'subscriber', 169, '77a61772-ce70-43e7-89e4-d198d537e400');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('47597401-c03d-4e61-84e0-93eea737d4d2', 'How do I reset my password', 'moderator', 907, 'eb42a61d-1caf-45f6-93ba-0d777523d5f7');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('9cae5a99-ede6-47c7-a899-e2310fed2769', 'What is the weather like today', 'moderator', 243, '9aad11d4-3bde-46f5-ad4b-4ab20dcc15c5');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('d99ed18f-d4bb-4af2-9ed7-261dc3dc2bb5', 'What is the weather like today', 'admin', 263, '5257e339-616d-446a-933c-7a46d94c0f1b');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('c43847d6-2e17-4e2d-baf1-e7714f6eb6e3', 'How do I reset my password', 'moderator', 535, '128aeb00-358a-4776-bce2-b39a72c4c817');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('cf1a1c31-5b61-48a3-aec1-771e42b643b8', 'Tell me a joke.', 'guest', 820, 'eb42a61d-1caf-45f6-93ba-0d777523d5f7');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('23affe76-93ee-47ab-acf2-e84965753196', 'Can you suggest a book for me to read', 'subscriber', 253, '128aeb00-358a-4776-bce2-b39a72c4c817');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('23cc1508-ab27-4f6d-979b-a4729d755cd6', 'Whats the latest news', 'user', 905, '77a61772-ce70-43e7-89e4-d198d537e400');
INSERT INTO "Message" ("id", "content", "role", "creditsUsed", "conversationId") VALUES ('1a2173da-f72e-4ae0-af0a-a992870ccfe1', 'Whats the latest news', 'user', 2, 'fc9b2ff8-890f-44ce-99f1-1dc2a847029f');

INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('1dc45014-8a5e-4f26-9ca3-30de43505092', '15.00', 'failed', 'pay_00123', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '027edc90-54ff-4b5d-8b31-d2e2ebe5959c');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('f64a9e6d-0684-47cf-bcfe-47af16e3b56b', '15.00', 'failed', 'pay_00789', 'afca26c4-125e-49df-9eb4-bd406c0909b7', '027edc90-54ff-4b5d-8b31-d2e2ebe5959c');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('396ed5e8-c81d-4ddd-b0dc-f468a1940dd7', '12.50', 'failed', 'pay_00456', 'afca26c4-125e-49df-9eb4-bd406c0909b7', 'a25b3e7c-753b-4341-8577-e1e14e493a70');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('89a8a8a8-b066-49e1-88b6-9cf49536a466', '9.99', 'processing', 'pay_00456', '44b77e26-54e1-46f5-aecd-133867a4dcc7', 'c5b1ddff-2702-44fb-89e1-5cf131432189');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('415fc1d7-ed23-44fe-9f48-3256a5bafbe3', '7.25', 'completed', 'pay_01012', '9dd9b2e4-f0ab-4e7e-b983-e40c75c1e035', '540ffa33-e6f6-4f7c-b338-d60666ce8d6a');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('e9347146-043a-4b5b-b3bc-7f1874115ec6', '15.00', 'completed', 'pay_01012', 'afba9706-5032-4bce-a37f-35868756233e', 'c5b1ddff-2702-44fb-89e1-5cf131432189');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('4bc85a6a-5703-42b5-994a-9c41068f4841', '15.00', 'pending', 'pay_01012', '44b77e26-54e1-46f5-aecd-133867a4dcc7', '540ffa33-e6f6-4f7c-b338-d60666ce8d6a');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('2bf8db8b-72cb-4bfd-a811-830fdbdc6292', '7.25', 'refunded', 'pay_01345', '1d38483f-87b5-4b5b-82fd-08f9ec18e346', '122dbdea-6f85-4652-adee-0d26c540ab5a');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('03213913-7a24-47a4-a8b1-86d14f14283f', '9.99', 'processing', 'pay_01012', '397d7bc2-a2d2-45fd-b85a-117bd5319adb', '027edc90-54ff-4b5d-8b31-d2e2ebe5959c');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentId", "userId", "planId") VALUES ('e1834807-f765-4367-a9bc-26cbc858c069', '15.00', 'refunded', 'pay_01345', '65216878-5470-44a0-988f-0cf7a27f8bf3', '122dbdea-6f85-4652-adee-0d26c540ab5a');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
