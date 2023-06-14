SELECT
  trx.id,
  trx."walletId",
  trx.amount,
  trx.note,
  trx."createdAt",
  trx."updatedAt",
  jsonb_build_object(
    'id',
    lbl.id,
    'title',
    lbl.title,
    'category',
    lbl.category
  ) AS label
FROM
  (
    (
      "Transactions" trx
      JOIN "TransactionLabels" lbl ON ((trx."labelId" = lbl.id))
    )
    JOIN "Wallets" wallet ON ((trx."walletId" = wallet.id))
  );