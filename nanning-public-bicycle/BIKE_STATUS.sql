/*
 Navicat Premium Data Transfer

 Source Server         : playground
 Source Server Type    : SQLite
 Source Server Version : 3008008
 Source Database       : main

 Target Server Type    : SQLite
 Target Server Version : 3008008
 File Encoding         : utf-8

 Date: 05/13/2016 23:16:38 PM
*/

PRAGMA foreign_keys = false;

-- ----------------------------
--  Table structure for BIKE_STATUS
-- ----------------------------
DROP TABLE IF EXISTS "BIKE_STATUS";
CREATE TABLE "BIKE_STATUS" (
	 "TIME" integer,
	 "NO" text,
	 "E" integer,
	 "T" integer,
	 "A" integer,
	 "R" real
);

PRAGMA foreign_keys = true;
