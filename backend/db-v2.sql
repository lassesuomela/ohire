-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ohire
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ohire
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ohire` DEFAULT CHARACTER SET utf8 COLLATE utf8_swedish_ci ;
USE `ohire` ;

-- -----------------------------------------------------
-- Table `ohire`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ohire`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` TINYINT(1) NOT NULL DEFAULT '1',
  `uuid` VARCHAR(255) NULL DEFAULT NULL,
  `company` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  UNIQUE INDEX `company_UNIQUE` (`company` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 46
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_swedish_ci;


-- -----------------------------------------------------
-- Table `ohire`.`joblistings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ohire`.`joblistings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `title` VARCHAR(60) NULL DEFAULT NULL,
  `salary` INT NULL DEFAULT NULL,
  `users_id` INT NOT NULL,
  `workingTime` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_jobListings_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_jobListings_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `ohire`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 31
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_swedish_ci;


-- -----------------------------------------------------
-- Table `ohire`.`applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ohire`.`applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `application` VARCHAR(1000) NOT NULL,
  `cvFile` VARCHAR(200) NOT NULL,
  `applicationFile` VARCHAR(200) NOT NULL,
  `rating` TINYINT NULL DEFAULT NULL,
  `users_id` INT NOT NULL,
  `joblistings_id` INT NOT NULL,
  `reviewed` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_jobListings_users_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_applications_joblistings1_idx` (`joblistings_id` ASC) VISIBLE,
  CONSTRAINT `fk_applications_joblistings1`
    FOREIGN KEY (`joblistings_id`)
    REFERENCES `ohire`.`joblistings` (`id`),
  CONSTRAINT `fk_jobListings_users0`
    FOREIGN KEY (`users_id`)
    REFERENCES `ohire`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_swedish_ci;


-- -----------------------------------------------------
-- Table `ohire`.`meetings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ohire`.`meetings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `expired` TINYINT(1) NULL DEFAULT '0',
  `joblistings_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_meetings_joblistings1_idx` (`joblistings_id` ASC) VISIBLE,
  CONSTRAINT `fk_meetings_joblistings1`
    FOREIGN KEY (`joblistings_id`)
    REFERENCES `ohire`.`joblistings` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_swedish_ci;


-- -----------------------------------------------------
-- Table `ohire`.`participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ohire`.`participants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `meetings_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_participants_meetings1_idx` (`meetings_id` ASC) VISIBLE,
  INDEX `fk_participants_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_participants_meetings1`
    FOREIGN KEY (`meetings_id`)
    REFERENCES `ohire`.`meetings` (`id`),
  CONSTRAINT `fk_participants_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `ohire`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_swedish_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
