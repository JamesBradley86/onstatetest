-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2016 at 11:23 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ostest`
--

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lng` decimal(11,8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`, `lat`, `lng`) VALUES
(1, 'London', '51.50735090', '-0.12775830'),
(2, 'Edinburgh', '55.95325200', '-3.18826700'),
(3, 'Cardiff', '51.48158100', '-3.17909000'),
(4, 'Belfast', '54.59728500', '-5.93012000'),
(5, 'Normanton on Trent', '53.21318000', '-0.81781200'),
(6, 'Boston', '52.97894000', '-0.02657700'),
(7, 'Leeds', '53.80075540', '-1.54907740'),
(8, 'Manchester', '53.48075930', '-2.24263050'),
(9, 'Burnley', '53.78928770', '-2.24050350'),
(10, 'Preston', '53.76320100', '-2.70309000'),
(11, 'Easingwold', '54.12144080', '-1.19187400'),
(12, 'Kendal', '54.32800600', '-2.74629000');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
