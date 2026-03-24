CREATE TABLE `receipt_index` (
	`id` int AUTO_INCREMENT NOT NULL,
	`monthLabel` varchar(32) NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`winner` varchar(64) NOT NULL,
	`basketTotals` json NOT NULL,
	`categoryBreakdown` json NOT NULL,
	`receiptCount` int NOT NULL DEFAULT 0,
	`summary` text,
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `receipt_index_id` PRIMARY KEY(`id`)
);
