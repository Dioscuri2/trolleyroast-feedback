CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`rating` int NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
