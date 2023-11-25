-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 22, 2023 lúc 11:52 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `life_skill_education_center`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` int(2) NOT NULL,
  `access` tinyint(1) NOT NULL,
  `create_at` date NOT NULL DEFAULT current_timestamp(),
  `personnel_id` int(11) DEFAULT NULL,
  `subscribers_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `role`, `access`, `create_at`, `personnel_id`, `subscribers_id`) VALUES
(7, 'kkk', '$2b$10$cBeWvP6Q.MVllltHFhBHYepnE1TNuJUjzAySLFBniRN6H5v1Qsas.', 2, 0, '2023-09-23', 6, NULL),
(12, 'qq11', '$2b$10$s68WdB6qbRL7dYibvv9S9.2uu.qhrka1z80qqfqJguwqx35WKX9BG', 2, 0, '2023-09-30', 12, NULL),
(13, '090808', '$2b$10$tjmT16UreAfVOA2JXXXE/uqWb/vCYEQuX174yY4hbIa45BCxRioNi', 3, 0, '2023-10-04', NULL, 1),
(14, '092212', '$2b$10$zgLSo11fhqLmnx/N07VXWuySXPt.c2F1SPASPKHWPoa4pYYsC9j.a', 3, 0, '2023-10-04', NULL, 6),
(15, '0922124', '$2b$10$f1482RXVnDzzIgPNaqankevt4issl5A2JAjw58A9JyGJE9QiK.GIG', 3, 0, '2023-10-04', NULL, 7),
(16, 'zz1', '$2b$10$cBeWvP6Q.MVllltHFhBHYepnE1TNuJUjzAySLFBniRN6H5v1Qsas.', 1, 0, '2023-09-23', 13, NULL),
(17, 'mm1', '$2b$10$zNwi/SkGyXE1JmNxI9Mxk.2FsaacwzzbICZqs8JXy5VVv2VZf28u6', 0, 0, '2023-10-14', 16, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts_notification`
--

CREATE TABLE `accounts_notification` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `link` varchar(1000) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `accounts_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assessment`
--

CREATE TABLE `assessment` (
  `id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `class_id` int(11) NOT NULL,
  `subscribers_id` int(11) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `assessment`
--

INSERT INTO `assessment` (`id`, `rate`, `content`, `class_id`, `subscribers_id`, `create_at`) VALUES
(2, 3, 'sdada', 6, 3, '2023-09-30 15:50:17'),
(3, 5, 'ád', 4, 1, '2023-09-29 15:50:17'),
(4, 2, 'ads', 8, 3, '2023-09-29 15:50:17'),
(5, 2, 'ads', 8, 3, '2023-09-28 15:50:17'),
(6, 1, 'ads', 8, 3, '2023-09-28 15:50:17'),
(7, 4, 'ads', 8, 3, '2023-09-28 15:50:17'),
(8, 5, 'ads', 8, 3, '2023-09-28 15:50:17'),
(9, 3, 'ads', 8, 3, '2023-09-28 15:50:17'),
(10, 5, 'ads', 8, 3, '2023-09-28 15:50:17'),
(11, 1, 'ads', 8, 3, '2023-09-28 15:50:17'),
(17, 4, 'mmm', 6, 1, '2023-09-29 20:39:45'),
(18, 4, 'mmm', 6, 1, '2023-09-29 20:39:46'),
(19, 4, 'mmm', 6, 1, '2023-09-29 20:39:47'),
(20, 4, 'mmm', 6, 1, '2023-09-29 20:39:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `subscribers_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `create_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `billing_information`
--

CREATE TABLE `billing_information` (
  `id` int(11) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_methods` tinyint(1) NOT NULL,
  `payment_amount` int(11) NOT NULL,
  `personnel_id` int(11) DEFAULT NULL,
  `regInfo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `billing_information`
--

INSERT INTO `billing_information` (`id`, `create_at`, `payment_methods`, `payment_amount`, `personnel_id`, `regInfo_id`) VALUES
(28, '2023-09-07 10:02:41', 1, 400000, NULL, 20),
(29, '2023-08-02 10:02:50', 0, 400788, 13, 8),
(30, '2023-08-16 10:02:58', 1, 400000, NULL, 21),
(31, '2023-07-12 10:03:06', 0, 400000, 13, 26),
(32, '2023-03-02 10:03:13', 0, 400000, 13, 25),
(33, '2023-02-10 10:03:21', 1, 400000, NULL, 31),
(34, '2023-10-14 10:03:26', 0, 400000, 13, 24);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `startTime` date NOT NULL,
  `endTime` date NOT NULL,
  `expression` varchar(30) NOT NULL,
  `quantity` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `personnel_id` int(11) DEFAULT NULL,
  `rooms_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `class`
--

INSERT INTO `class` (`id`, `name`, `startTime`, `endTime`, `expression`, `quantity`, `courses_id`, `personnel_id`, `rooms_id`) VALUES
(4, 'A1', '2023-10-16', '2023-10-31', 'Trực tiếp (offline)', 20, 92, 6, NULL),
(6, 'A2', '2023-10-23', '2023-10-31', 'Trực tiếp (offline)', 20, 92, 7, NULL),
(8, 'A3', '2023-10-19', '2023-10-30', 'Trực tiếp (offline)', 20, 92, 12, NULL),
(10, 'A12', '2023-10-17', '2023-10-31', 'Trực tiếp (offline)', 30, 92, 7, NULL),
(11, 'B1', '2023-10-22', '2023-10-31', 'Trực tiếp (offline)', 30, 112, 12, NULL),
(12, 'B2', '2023-10-17', '2023-10-24', 'Trực tiếp (offline)', 30, 112, 7, NULL),
(13, 'B3', '2023-10-17', '2023-10-30', 'Trực tiếp (offline)', 30, 112, 6, NULL),
(14, 'C1', '2023-10-22', '2023-10-31', 'Trực tuyến (online)', 25, 113, 12, NULL),
(15, 'C2', '2023-10-23', '2023-10-31', 'Trực tuyến (online)', 25, 113, 6, NULL),
(16, 'C3', '2023-10-23', '2023-11-08', 'Trực tuyến (online)', 25, 113, 6, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `class_notification`
--

CREATE TABLE `class_notification` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `class_notification`
--

INSERT INTO `class_notification` (`id`, `content`, `create_at`, `class_id`) VALUES
(1, 'n,n,mn,mn,n', '2023-09-24 20:59:04', 4),
(5, '<p>ádadadas</p>', '2023-09-24 21:13:34', 4),
(16, '<p>,mn,nm,n,</p>', '2023-09-25 19:54:06', 6),
(17, '<p>adasdsdasdsd</p><img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT66HLnCN8ZHqLJg4VwkoqD0alPwiaLLc06ACo61dYA&amp;s\">', '2023-09-25 20:14:12', 4),
(18, '<p>mmm</p>', '2023-09-30 00:07:41', 6),
(19, '<p>lơp nghỉ</p>', '2023-09-30 12:31:13', 8),
(20, '<p>mmm</p>', '2023-09-30 14:47:33', 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `class_studytime`
--

CREATE TABLE `class_studytime` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `studyTime_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `class_studytime`
--

INSERT INTO `class_studytime` (`id`, `class_id`, `studyTime_id`) VALUES
(14, 4, 15),
(15, 4, 16),
(16, 6, 17),
(17, 6, 18),
(18, 8, 19),
(19, 8, 20),
(20, 10, 17),
(21, 10, 18),
(22, 11, 19),
(23, 11, 20),
(24, 12, 22),
(25, 12, 23),
(26, 13, 15),
(27, 13, 16),
(28, 14, 24),
(29, 14, 25),
(30, 15, 28),
(31, 15, 29),
(32, 16, 26),
(33, 16, 27);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `title` varchar(110) DEFAULT NULL,
  `fee` int(11) NOT NULL,
  `numberSession` int(11) NOT NULL,
  `content` text NOT NULL,
  `object` varchar(40) NOT NULL,
  `promotionTime_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `courses`
--

INSERT INTO `courses` (`id`, `name`, `title`, `fee`, `numberSession`, `content`, `object`, `promotionTime_id`) VALUES
(92, 'Khóa Kĩ năng sống hè 2023', 'qew', 500000, 20, '<p><strong>Bài 1: Kỹ năng giao tiếp hiệu quả</strong></p><p><strong>Bài học 2: Kỹ năng nhận thức bản thân</strong></p><p><strong>Bài 3: Kỹ năng lắng nghe thấu cảm</strong></p><p><strong>Bài 4: Kỹ năng xác định mục tiêu</strong></p><p><strong>Bài 5: Kỹ năng giải quyết vấn đề</strong></p><p><strong>Bài 6: Kỹ năng ra quyết định</strong></p><p><strong>Bài 7: Kỹ năng làm chủ cảm xúc, làm chủ bản thân</strong></p><p><strong>Bài 8: Giá trị sống: Giá trị Tôn trọng</strong></p><p></p>', 'Trẻ em', 1),
(110, 'Khóa Kĩ năng sống trẻ 3', 'qew', 500000, 20, '<p><strong>Bài 1: Kỹ năng giao tiếp hiệu quả</strong></p><p><strong>Bài học 2: Kỹ năng nhận thức bản thân</strong></p><p><strong>Bài 3: Kỹ năng lắng nghe thấu cảm</strong></p><p><strong>Bài 4: Kỹ năng xác định mục tiêu</strong></p><p><strong>Bài 5: Kỹ năng giải quyết vấn đề</strong></p><p><strong>Bài 6: Kỹ năng ra quyết định</strong></p><p><strong>Bài 7: Kỹ năng làm chủ cảm xúc, làm chủ bản thân</strong></p><p><strong>Bài 8: Giá trị sống: Giá trị Tôn trọng</strong></p><p></p>', 'Trẻ em', NULL),
(112, 'Dạy kỹ năng cho trẻ tự kỷ', NULL, 1200000, 20, '<p><strong><em>“Trên thế giới, tỷ lệ trẻ được phát hiện và chẩn đoán tự kỷ cao một cách đáng kể. Ở&nbsp;Mỹ là&nbsp;1 trên 68&nbsp;(http://laodongxahoi.net/thuc-trang-benh-tu-ky-va-mot-so-dinh-huong-1304350.html). Trung bình tỷ lệ trẻ tự kỷ của thế giới là 1% dân số. Rõ ràng số trẻ tự kỷ ở Việt nam lớn hơn rất nhiều so với con số ước tính 200.000. Với tốc độ phát triển của Internet, smartphone &amp; CMCN4, hoạt động tay chân và giao tiếp trực diện người với người càng ít đi, khả năng tự kỷ ngày càng lớn hơn rất nhanh.&nbsp;Đây là một thực trạng đáng báo động.</em></strong></p><p><strong><em>&nbsp;</em></strong></p><p><strong><em>Với trẻ tự kỷ sau 6 tuổi, đặc biệt là lứa tuổi dậy thì, hiện nay trên thế giới chưa có phương pháp can thiệp hiệu quả. Làm thế nào để hòa nhập cộng đồng &amp; định hướng nghề nghiệp cho các em?<br></em>Các phương pháp của Tâm Việt giúp trẻ tự kỷ&nbsp;<br></strong><em>“Trong đào tạo, không có phương pháp tốt, chỉ có phương pháp phù hợp nhất”.</em></p>', 'trẻ em', 1),
(113, 'Kỹ năng Lãnh đạo & quản lý hiệu quả', NULL, 2000000, 25, '<p><strong>I. Giới thiệu:</strong></p><p>Với mỗi tổ chức, doanh nghiệp thì người quản lý là người giữ linh hồn, truyền cảm hứng và dẫn dắt tổ chức đi lên. Lãnh đạo là một nghệ thuật, một nhiệm vụ chứ không phải chức vụ hay một cái ghế. Song triết lý đơn giản đó không phải nhà lãnh đạo nào cũng hiểu thấu đáo. Thay đổi phương thức lãnh đạo và quản lý trong một thế giới hội nhập để xây dựng một doanh nghiệp trường tồn hay giữ cách thức quản lý truyền thống để tổ chức của mình không bị \"bật bãi\" là một câu hỏi lớn của chủ doanh nghiệp.</p><p>Hoàn thành khóa học này, học viên sẽ thay đổi nhận thức về lãnh đạo và quản lý nhằm nâng cao khả năng xây dựng chiến lược cho tổ chức, khả năng điều hành và động viên, khích lệ nhân viên góp phần nâng cao hiệu quả hoạt động của công ty.</p><p><strong>II. Mục tiêu:</strong></p><p>Sau khi hoàn thành khóa học, học viên sẽ thực hiện được:</p><p>- Hiểu khái niệm về quản lý;<br>- Phân biệt lãnh đạo và quản lý;<br>- Tư duy của người quản lý;<br>- Vai trò, trách nhiệm và công việc của người lãnh đạo và quản lý;<br>- Áp dụng kỹ năng quản lý, giám sát nhân viên cấp dưới hiệu quả;<br>- Giao quyền, giao việc cho cấp dưới làm việc;<br>- Thiết lập mục tiêu và lập kế hoạch triển khai;<br>- Vận dụng các kỹ năng tạo động lực làm việc cho nhân viên;<br>- Có kỹ năng giải quyết và tổ chức công việc hiệu quả;<br>- Áp dụng tốt các phương thức điều hành, hội họp.<br>- Tâm thái &amp; năng lượng đỉnh cao của người lãnh đạo.</p><p><strong>III. Nội dung chính:</strong></p><p>1. Tâm thế lãnh đạo, quản lý xuất chúng</p><p>- Năng lượng đỉnh cao của người lãnh đạo</p><p>- Khởi tạo &amp; duy trì tâm thế xuất chúng</p><p>- Các phương pháp nạp &amp; duy trì năng lượng đỉnh cao</p><p>- Tâm thế Phụng sự kiệt xuất của người lãnh đạo</p><p>- Tái lập trình: Win - Win - Win cho Tôi, Đối tác &amp; Xã hội</p><p>2. Nghệ thuật Lãnh đạo, quản lý hiệu quả:</p><p>- 5 cấp lãnh đạo &amp; quản lý hiệu quả</p><p>- Lãnh đạo, quản lý 360 độ</p><p>- Thấu hiểu chính mình để thấu hiểu đối tác</p><p>- Lãnh đạo &amp; quản lý bằng quản trị nhân hiệu</p><p>- Kỹ năng giao việc &amp; giao quyền</p><p>- Kỹ năng tạo động lực</p><p>3. Kỹ năng giải quyết vấn đề</p><p>- Mục tiêu SMART &amp; SMARTER</p><p>- Kế hoạch hành động STARS:</p><p>+ Thiết lập kế hoạch hành động</p><p>+ Khích lệ và giám sát</p><p>+ Tổng kết và đánh giá</p><p>4. Đồng đội sáng tạo giải quyết vấn đề</p><p>- Nguyên tắc sáng tạo &amp; tổ chức công việc</p><p>- Công cụ tư duy sáng tạo</p><p>- Giải quyết xung đột</p>', 'người trưởng thành', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses_progroups`
--

CREATE TABLE `courses_progroups` (
  `id` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `promotionGroups_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `name_change` text NOT NULL,
  `link` text NOT NULL,
  `type` varchar(10) NOT NULL,
  `subscribers_id` int(11) DEFAULT NULL,
  `personnel_id` int(11) DEFAULT NULL,
  `courses_id` int(11) DEFAULT NULL,
  `posts_id` int(11) DEFAULT NULL,
  `test` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `files`
--

INSERT INTO `files` (`id`, `name`, `name_change`, `link`, `type`, `subscribers_id`, `personnel_id`, `courses_id`, `posts_id`, `test`) VALUES
(68, 'images.png', '1695654190058-images.png', 'http://localhost:3000/uploads/1695654190058-images.png', 'png', NULL, 12, NULL, NULL, 0),
(69, 'images (1).png', '1695997128917-images (1).png', 'http://localhost:3000/uploads/1695997128917-images (1).png', 'png', NULL, NULL, NULL, NULL, 0),
(70, 'images (1).png', '1695997319646-images (1).png', 'http://localhost:3000/uploads/1695997319646-images (1).png', 'png', NULL, NULL, NULL, NULL, 0),
(71, 'images (1).png', '1695997548803-images (1).png', 'http://localhost:3000/uploads/1695997548803-images (1).png', 'png', NULL, NULL, NULL, NULL, 0),
(72, 'images (1).png', '1695997818370-images (1).png', 'http://localhost:3000/uploads/1695997818370-images (1).png', 'png', NULL, NULL, NULL, NULL, 0),
(73, 'images (1).png', '1695997866367-images (1).png', 'http://localhost:3000/uploads/1695997866367-images (1).png', 'png', NULL, NULL, NULL, NULL, 0),
(75, 'images (1).png', '1695998053143-images (1).png', 'http://localhost:3000/uploads/1695998053143-images (1).png', 'png', 1, NULL, NULL, NULL, 0),
(76, 'images (1).png', '1696000700590-images (1).png', 'http://localhost:3000/uploads/1696000700590-images (1).png', 'png', NULL, 13, NULL, NULL, 0),
(79, 'B1906760_LuanVanTotNghiep.pdf', '1696002245314-B1906760_LuanVanTotNghiep.pdf', 'http://localhost:3000/uploads/1696002245314-B1906760_LuanVanTotNghiep.pdf', 'pdf', NULL, NULL, 92, NULL, 0),
(80, 'B1906760_LuanVanTotNghiep(sua phan gioi thieu).pdf', '1696002296203-B1906760_LuanVanTotNghiep(sua phan gioi thieu).pdf', 'http://localhost:3000/uploads/1696002296203-B1906760_LuanVanTotNghiep(sua phan gioi thieu).pdf', 'pdf', NULL, NULL, 92, NULL, 0),
(82, 'images (1).png', '1696059728992-images (1).png', 'http://localhost:3000/uploads/1696059728992-images (1).png', 'png', NULL, 6, NULL, NULL, 0),
(84, 'images.png', '1696427155967-images.png', 'http://localhost:3000/uploads/1696427155967-images.png', 'png', 6, NULL, NULL, NULL, 0),
(86, 'images (1).png', '1697249875728-images (1).png', 'http://localhost:3000/uploads/1697249875728-images (1).png', 'png', NULL, 16, NULL, NULL, 0),
(87, 'ky-nang-song-la-gi.jpg', '1697251038022-ky-nang-song-la-gi.jpg', 'http://localhost:3000/uploads/1697251038022-ky-nang-song-la-gi.jpg', 'jpg', NULL, NULL, NULL, 12, 0),
(88, 'trenangkhieu-600x400.jpg', '1697251446031-trenangkhieu-600x400.jpg', 'http://localhost:3000/uploads/1697251446031-trenangkhieu-600x400.jpg', 'jpg', NULL, NULL, NULL, 13, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `medium_score`
--

CREATE TABLE `medium_score` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `subscribers_id` int(11) NOT NULL,
  `numberSession` int(11) NOT NULL,
  `score` float NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `medium_score`
--

INSERT INTO `medium_score` (`id`, `class_id`, `subscribers_id`, `numberSession`, `score`, `create_at`) VALUES
(13, 4, 1, 20, 9, '2023-10-07 20:02:15'),
(14, 4, 3, 19, 7, '2023-10-07 20:01:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personnel`
--

CREATE TABLE `personnel` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `sex` varchar(5) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `degree` varchar(50) NOT NULL,
  `position_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `personnel`
--

INSERT INTO `personnel` (`id`, `name`, `birthday`, `sex`, `address`, `phone`, `email`, `degree`, `position_id`) VALUES
(6, 'Lê A', '2000-04-06', 'Nữ', 'Xã Thanh Xuân, Huyện Sóc Sơn, Thành phố Hà Nội', '0990909899', 'app@gg.com', 'Cao đẳng', 16),
(7, 'Cẩm B', '1999-04-06', 'Nữ', 'Xã Đông Hưng, Huyện Cái Nước, Tỉnh Cà Mau', '0909113', '233adds@gg.com', 'Đại học', 16),
(12, 'Lê Tú', '1998-02-03', 'Nữ', 'Xã Biển Bạch Đông, Huyện Thới Bình, Tỉnh Cà Mau', '092919212', 'sdad@gg.com', 'Cao đẳng', 16),
(13, 'Trần Văn B', '1999-01-03', 'Nam', 'Xã Đông Xuân, Huyện Sóc Sơn, Thành phố Hà Nội', '09291832', '122@gmail.com', 'Đại học', 28),
(16, 'Văn A', '2000-02-02', 'Nam', 'Xã Nhữ Khê, Huyện Yên Sơn, Tỉnh Tuyên Quang', '0982182311', 'mm@gmai.com', 'đại học', 29);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `position`
--

CREATE TABLE `position` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `position`
--

INSERT INTO `position` (`id`, `name`) VALUES
(16, 'Giáo viên'),
(28, 'Nhân viên tài chính'),
(29, 'Quản trị viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `create_at`) VALUES
(10, 'kỹ năng sống là gì', '<h2><strong>KỸ NĂNG SỐNG LÀ GÌ?</strong></h2><p>Có nhiều quan điểm khác nhau về <strong>kỹ năng sống</strong>:</p><ul><li><p>Theo quan niệm của tổ chức văn hóa, khoa học giáo dục của Liên Hiệp Quốc (UNESCO): Kỹ năng sống là năng lực cá nhân để thực hiện đầy đủ các chức năng và tham gia vào cuộc sống hàng ngày.</p></li><li><p>Theo quan niệm của tổ chức y tế thế giới (WHO): <strong>Kỹ năng sống</strong> là những kỹ năng mang tính tâm lý xã hội và kỹ năng về giao tiếp được vận dụng trong các tình huống hằng ngày để tương tác có hiệu quả với người khác và giải quyết có hiệu quả những vấn đề, những tình huống của cuộc sống hàng ngày.</p></li></ul><p>Nói tóm lại, nói tới kỹ năng sống không đơn giản chỉ ở nhận thức mà cao hơn nữa con người còn biết tích cực vận dụng những kiến thức đã học vào xử lý các tình huống thực tiễn có hiệu quả, qua đó giúp con người sống vui vẻ, có ý nghĩa hơn.</p><h2><strong>ĐẶC TRƯNG CƠ BẢN CỦA KỸ NĂNG SỐNG</strong></h2><ul><li><p><em>Kỹ năng sống</em>&nbsp;là khả năng con người biết cách sống phù hợp và hữu ích.</p></li><li><p><em>Kỹ năng sống</em>&nbsp;là khả năng con người dám đương đầu với những tình huống khó khăn trong cuộc sống và biết cách vượt qua.</p></li><li><p><em>Kỹ năng sống</em>&nbsp;là kỹ năng tâm lý xã hội, con người biết quản lý bản thân mình và tương tác tích cực với người khác, với xã hội.</p></li></ul><img src=\"https://wedowegood-school.edu.vn/wp-content/uploads/2017/03/ky-nang-song-1-600x400.jpg\">', '2023-09-30 12:28:40'),
(12, 'Top 10 Kỹ Năng Sống Có Ích Cho Công Việc Của Bạn', '<h2><strong>10 kỹ năng sống quan trọng nhất</strong></h2><p>Kỹ năng sống rất đa dạng nhưng chỉ cần có được các kỹ năng sống cơ bản sau đây, cuộc sống cá nhân lẫn công việc của bạn sẽ trở nên dễ dàng hơn.&nbsp;</p><h3><strong>Giải quyết vấn đề</strong></h3><p>Giải quyết vấn đề là kỹ năng sống quan trọng hàng đầu. Dù bạn có bị lạc trên hoang đảo hay đang gặp phải một sai sót tai hại trong công việc thì kỹ năng giải quyết vấn đề là yếu tố quan trọng giúp bạn thoát khỏi rắc rối.&nbsp;</p><p>Bạn cần nắm được các bước để có thể phát huy kỹ năng này và giải quyết vấn đề hiệu quả:&nbsp;</p><ul><li><p>Hiểu bản chất của vấn đề</p></li><li><p>Tìm hiểu nguyên nhân</p></li><li><p>Tìm kiếm các giải pháp khác nhau</p></li><li><p>Lựa chọn giải pháp tốt nhất</p></li></ul><p>Kỹ năng giải quyết vấn đề không chỉ có tác dụng đối với những vấn đề lớn xảy ra đem lại hậu quả nghiêm trọng. Tư duy và suy nghĩ bạn có được từ kỹ năng giải quyết vấn đề có thể áp dụng vào công việc hàng ngày, những tình huống nhỏ nhặt trong cuộc sống để mọi thứ trở nên thuận lợi hơn.&nbsp;</p><h3><strong>Kỹ năng ra quyết định</strong></h3><p>Trong cuộc sống và công việc, có rất nhiều tình huống chúng ta phải đưa ra lựa chọn hay quyết định của mình. Kỹ năng ra quyết định không chỉ đơn giản là một kết luận mà là cả một quá trình nhiều bước không khác kỹ năng giải quyết vấn đề.&nbsp;</p><p>Để có thể đưa ra quyết định đúng đắn, một người cần cân nhắc các yếu tố như được và mất, điểm mạnh và điểm yếu, nguy cơ và cơ hội.&nbsp;</p><h3><strong>Tự nhân thức (self awareness)</strong></h3><p>Theo một dự án nghiên cứu kéo dài 5 năm của nhà tâm lý học tổ chức Tasha Eurich, trong khi 95% mọi người tin rằng họ tự nhận thức được bản thân, thì thực tế chỉ có 10% đến 15% là như vậy.</p><p>Khả năng tự nhận thức bản thân rất quan trọng vì nó giúp mọi người hiểu về chính mình. Việc nắm rõ mong muốn, nhu cầu, điểm mạnh, điểm yếu và giới hạn của bản thân rất quan trọng. Nó ảnh hưởng đến các quyết định liên quan đến học tập, công việc và cuộc sống cá nhân.</p><h3><strong>Giao tiếp hiệu quả</strong></h3><p>Kỹ năng giao tiếp hiệu quả ở cả phương diện ngôn ngữ và phi ngôn ngữ đều rất quan trọng đối với hoạt động hàng ngày của mỗi người. Giao tiếp đối với cảm xúc và cảm giác của bản thân cũng tác động đến sức khỏe tinh thần.&nbsp;</p><h3><strong>Kỹ năng quản lý cảm xúc</strong></h3><p>Mỗi người có rất nhiều cảm xúc khác nhau. Có cảm xúc tiêu cực và tích cực. Nếu không biết cách quản lý cảm xúc và để cảm xúc chi phối, dù là tiêu cực hay tích cực đều có thể gây ra ảnh hưởng không tốt.&nbsp;</p><p>Ví dụ như khi gặp phải tình huống tranh cãi, nếu không quản lý tốt cảm xúc tức giận, người trong cuộc rất dễ phạm phải sai lầm không đáng có và làm tổn thương người khác.&nbsp;</p><h3><strong>Quản lý căng thẳng</strong></h3><p>Bất cứ ai cũng có thể trải qua thời gian khó khăn dẫn đến căng thẳng tinh thần. Rất nhiều lý do khiến chúng ta dễ dàng bị stress như công việc không thuận lợi, thất nghiệp, tình yêu trắc trở hay thi cử.&nbsp;</p><p>Nếu không thể quản lý tốt căng thẳng và để nó tiếp diễn, sức khỏe tinh thần thậm chí thể chất đều bị ảnh hưởng. Người quản lý căng thẳng tốt dễ dàng vượt qua khó khăn trong cuộc sống.&nbsp;</p><img src=\"http://localhost:3000/uploads/1697251038022-ky-nang-song-la-gi.jpg\"><h3><strong>Tư duy phản biện</strong></h3><p>Tư duy phản biện là kỹ năng sống giúp chúng ta sáng suốt hơn và không bị lôi kéo, ảnh hưởng bởi thông tin sai lệch, đưa ra những quyết định sai lầm.&nbsp;</p><p>Trong thời đại công nghệ bùng nổ, chúng ta dễ dàng bị bội thực thông tin. Thật giả lẫn lộn và thông tin không được xác thực lan tràn khắp mạng xã hội. Mọi người thường chỉ đọc thông tin từ một phía và vội vàng đưa ra kết luận, thậm chí lên án, đánh giá nhầm một ai đó.&nbsp;</p><p>Những lúc này, vận dụng tư duy phản biện sẽ giúp chúng ta có cái nhìn khách quan hơn và nhận định đúng đắn hơn về một sự việc.&nbsp;</p><h3><strong>Tư duy sáng tạo</strong></h3><p>Tư duy sáng tạo không chỉ cần cho những ai làm công việc liên quan đến nghệ thuật. Sự sáng tạo giúp công việc, cuộc sống của chúng ta dễ dàng và mới mẻ hơn ở mọi phương diện.&nbsp;</p><p><strong>Đọc thêm: Cách Rèn Luyện Tư Duy Sáng Tạo Trong Công Việc</strong></p><h3><strong>Cảm thông</strong></h3><p>“Nếu chỉ nhìn vẻ bề ngoài thì mọi người đều trông rất bình thường. Nhưng bên trong, ai cũng có thể đang chiến đấu với một thách thức của riêng họ”&nbsp;</p><p>Mỗi người đều có quan điểm, suy nghĩ khác biệt, khó khăn và vấn đề của họ cũng không giống nhau. Nếu dùng sự cảm thông cho hoàn cảnh của người khác và đặt mình vào vị trí của người khác, chúng ta sẽ dễ dàng thấu hiểu và đối xử tốt hơn với mọi người.&nbsp;</p><h3><strong>Kỹ năng về mối quan hệ giữa các cá nhân</strong></h3><p>Mỗi người cần có kỹ năng về phát triển và duy trì mối quan hệ thân thiện với những người có giá trị trong cuộc đời của họ. Đó có thể là quan hệ người thân, bạn bè, đồng nghiệp, v.v.&nbsp;</p><p>Chúng ta không thể sống một mình và việc kết nối với mọi người khiến cuộc sống của ta trọn vẹn, tốt đẹp hơn. Các mối quan hệ lành mạnh còn cung cấp giá trị, đôi khi mang đến những cơ hội hiếm có trong công việc.</p>', '2023-10-14 09:37:53'),
(13, 'Kỹ năng sống bao gồm những kỹ năng gì?', '<h2><strong>Kỹ năng sống bao gồm những gì?</strong></h2><img src=\"http://localhost:3000/uploads/1697251446031-trenangkhieu-600x400.jpg\"><h3><strong>1. Kỹ năng ứng phó, thoát hiểm</strong></h3><p>Bây giờ với tình trạng trái đất ngày càng nóng lên, khí hậu biến đổi khó lường nên với con trẻ kỹ năng tự bảo vệ và thoát hiểm thực sự rất quan trọng. Việc các con học tốt các môn học ở trên lớp là chưa đủ, nếu giỏi văn, giỏi toán mà không biết những <strong>kỹ năng đối phó, thoát hiểm</strong> thì cái giỏi kia không còn tính áp dụng. Lúc gặp khó khăn, nguy hiểm, việc cần làm là phải biết cách thoát ra khỏi nơi nguy hiểm một cách an toàn và hiệu quả.</p><p>Những kỹ năng này bao gồm: Thoát khỏi hỏa thiếu, ngập lụt, địa chấn, cháy rừng, lũ lụt, tai nạn thương tích, xâm hại hay bắt cóc. Hay như hiện thời người tốt và người xấu rất khó phân biệt thì các con luôn cần phòng ngừa, cảnh giác trong những trường hợp như: Người lạ rủ rê, lôi kéo, lừa đảo,…. Đây là những kỹ năng vô cùng quan trọng cuộc sống hàng ngày vì mỗi cá nhân khi không có kỹ năng này thậm chí còn phải trả giá bằng cả tính mạng của mình.</p><p></p><h3><strong>2. Kỹ năng tự chăm sóc bản thân</strong></h3><p>Hiện nay không phải gia đình nào cũng có điều kiên để thuê người giúp việc, người chăm trẻ hay có người thân chăm sóc con cái giúp, mà có những đứa trẻ phải thường xuyên phải ở nhà 1 mình, vậy khi ở nhà 1 mình sẽ có rất nhiều nguy cơ hiểm nguy xảy ra với con như: Con bị đói, khát, tự làm mình bị thương khi sử dụng vật sắc đẹp nhọn (dao, kéo, kim,…) hay thậm chí là bị điện giật.</p><p>Vậy kỹ năng này giúp con có thể tự lập khi ở nhà 1 mình hay thậm chí còn có thể chăm sóc được người khác nữa, qua đó cha mẹ sẽ thật sự yên tâm để làm việc.</p><h3><strong>3. Kỹ năng quản lý cảm xúc</strong></h3><p>Chúng ta thấy 1 thực tế rất rõ là các bạn trẻ đã gây ra rất nhiều những vụ việc thương tâm, vì 1 chút nóng giận, vì 1 cái nhìn “đểu”, vì 1 chút hiểu lầm đã lấy đi tính mạng của 1 người khác hay kể cả là người thân trong gia đình. Vậy căn do do đâu? Do họ không biết dung hòa cảm xúc? không làm chủ được mình? Do họ chưa có <strong>kỹ năng quản lý cảm xúc</strong> của mình. Vậy chúng ta chỉ giải quyết đuọc nó khi chúng ta có thể vượt qua được, hiểu rõ và <strong>kiềm chế cảm xúc</strong>&nbsp;của mình.</p><p></p><h3><strong>4. Kỹ năng quản lý thời gian, tiền bạc</strong></h3><p>Hiện nay tình trạng cha mẹ muốn thảnh thơi để làm việc, nên hay cho con cái tiền để tự mua quà, bánh, những thứ mà con thích hay đưa điện thoại, máy tính để con chơi, nghịch. Như vậy vô tình cha mẹ đã nuông chiều con và từ đó con đổ đốn, hư hỏng, sa ngã vào tệ nạn xã hội,…. Vậy nên <strong>kỹ năng quản lý thời gian, tiền bạc</strong> giúp con hay chính bố mẹ biết cách sử dụng những đồng tiền đó sao cho hợp lý nhất cho cuộc sống hiện tại cũng như tương lai.</p><p>Với việc vẫn còn là học trò vẫn ngồi trên ghế nhà trường nên các con chưa ý thức được tầm quan trọng của thời gian và chưa sử dụng nó 1 cách hợp lý (như dành cả ngày nghỉ để đi chơi game, đàn đúm đám bạn bè cho những ngày học vất vả).</p><p>Nếu thời gian đó con trẻ để ra trau dồi lại kiến thức, viện trợ bố mẹ làm những công việc nhà, chăm sóc những người thân yêu.</p><h3><strong>5. Kỹ năng giải quyết vấn đề</strong></h3><p>Hàng ngày xunh quanh chúng ta xảy ra biết bao nhiêu việc cần để giải quyết, mỗi công việc lại có 1 đặc thù khác nhau, vậy giải quyết như thế nào để cho ăn nhập và hiệu quả nhất thì chúng ta cần có <strong>kỹ năng giải quyết vấn đề</strong>. Vậy để có được những kỹ năng đó chúng ta phải tự trang bị cho mình những hành trang cấp thiết để khi vấn đề nảy sinh thì chúng ta có thể áp dụng những kỹ năng sẵn có để giải quyết vấn đề đó một cách hiệu quả nhất.</p><h3><strong>6. Kỹ năng tự nhận thức, biết cảm thông</strong></h3><p>Đôi khi trong cuộc sống, việc hy sinh cái tôi của chính mình sẽ đem lại ích lợi to lớn cho tập thể và cộng đồng. Nếu ngay từ nhỏ các con đã hiểu được điều này, hiểu được cần phải nhận thức và cảm thông (cảm thông có nghĩa là đặt mình vào vị trí của người khác, nhận biết và hiểu được cảm xúc của người đó. Cảm thông không có nghĩa là cảm thấy thương hại họ, nói những lời đãi bôi, mà là nhận biết và hiểu được cảm nhận của họ, những gì họ đã phải trải qua, cả niềm vui và đau khổ ) với kỹ năng này các con xây dựng mục đích sống cho bản thân mình và có thể trợ giúp, thấu hiểu mọi người xunh quanh.</p><h3><strong>7. Kỹ năng tư duy sáng tạo</strong></h3><p>Mỗi người khi sinh ra ai cũng có <strong>kỹ năng tư duy sáng tạo</strong>. Kỹ năng này giúp mỗi chúng ta ngày càng phát triển và đi lên.ở lứa tuổi nhỏ kỹ năng tư duy sáng tạo càng biểu hiện rõ ví dụ như: Các con sáng tác ra những câu truyện, những nhân vật trong tưởng tượng của con,…. Mỗi bạn nhỏ lại có sự <strong>tư duy sáng tạo</strong> khác nhau vậy nên nếu con không được quan tâm duy trì và phát huy kỹ năng này sẽ mai một đi và là sự thiệt thòi lớn của con trong tương lai phía trước.</p><h3><strong>8. Kỹ năng thương lượng, thương thuyết</strong></h3><p>Đây là 1 trong những kỹ năng quan trọng nhất đối với các con. Nó giúp con trở nên tự tin hơn, mạnh dạn hơn. Kỹ năng này không phải tự nhiên mà có, nó là cả 1 quá trình luyện tập, trau dồi. Một đứa trẻ giỏi chưa chắc đã thuyết trình tốt, hay có thể diễn đạt 1 vấn đề nào đó cho người khác hiểu. Tương lai con có thành công hay không thì kỹ năng này quyết định rất nhiều.</p><p>Trên đây là <strong>8 kỹ năng sống thực sự cần thiết</strong> cho sự tồn tại, phát triển của con và cũng là câu trả lời cho câu hỏi kỹ năng sống bao gồm những gì? Việc hình thành, trau dồi những <strong><em>kỹ năng sống</em></strong> này giúp con hoàn thiện bản thân và tự tin bước vào cuộc sống.</p>', '2023-10-14 09:44:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion_groups`
--

CREATE TABLE `promotion_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotion_groups`
--

INSERT INTO `promotion_groups` (`id`, `name`, `min`, `max`, `value`) VALUES
(6, 's', 2, 3, 23);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion_time`
--

CREATE TABLE `promotion_time` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotion_time`
--

INSERT INTO `promotion_time` (`id`, `name`, `startTime`, `endTime`, `value`) VALUES
(1, 'hhâxa', '2023-09-13 02:16:21', '2023-10-30 17:00:00', 20),
(2, 'mmsâs1', '2023-09-27 14:16:21', '2023-10-02 14:16:21', 20),
(4, 'mmsâs1', '2023-09-28 07:16:21', '2023-10-10 17:00:00', 20),
(5, 'mk0', '2023-09-28 17:00:00', '2023-09-29 17:00:00', 40);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `registration_information`
--

CREATE TABLE `registration_information` (
  `id` int(11) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `fees_calculated` float NOT NULL,
  `class_id` int(11) NOT NULL,
  `subscribers_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `registration_information`
--

INSERT INTO `registration_information` (`id`, `create_at`, `fees_calculated`, `class_id`, `subscribers_id`, `status`) VALUES
(8, '2023-09-23 21:43:14', 400788, 8, 1, 1),
(17, '2023-09-30 12:51:23', 400000, 4, 1, 1),
(18, '2023-09-30 14:51:06', 400000, 6, 1, 1),
(20, '2023-10-14 09:50:04', 400000, 10, 7, 1),
(21, '2023-09-05 09:50:04', 400000, 12, 7, 1),
(22, '2023-08-05 09:50:04', 400000, 12, 7, 2),
(23, '2023-09-05 09:50:04', 400000, 4, 7, 2),
(24, '2023-07-05 09:50:04', 400000, 16, 7, 1),
(25, '2023-07-05 09:50:04', 400000, 4, 7, 1),
(26, '2023-09-05 09:50:04', 400000, 4, 7, 1),
(27, '2023-03-05 09:50:04', 400000, 14, 7, 0),
(28, '2023-02-05 09:50:04', 400000, 14, 7, 2),
(29, '2023-03-05 09:50:04', 400000, 4, 7, 0),
(30, '2023-04-05 09:50:04', 400000, 11, 7, 0),
(31, '2023-05-05 09:50:04', 400000, 4, 7, 1),
(32, '2023-04-05 09:50:04', 400000, 10, 7, 2),
(33, '2023-05-05 09:50:04', 400000, 8, 7, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `study_time`
--

CREATE TABLE `study_time` (
  `id` int(11) NOT NULL,
  `thu` varchar(10) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `study_time`
--

INSERT INTO `study_time` (`id`, `thu`, `startTime`, `endTime`) VALUES
(15, '2', '06:00:00', '08:00:00'),
(16, '4', '06:00:00', '08:00:00'),
(17, '3', '01:00:00', '03:00:00'),
(18, '5', '01:00:00', '03:00:00'),
(19, '7', '00:00:00', '02:00:00'),
(20, 'Chủ nhật', '00:00:00', '02:00:00'),
(22, '7', '07:15:00', '08:20:00'),
(23, 'Chủ nhật', '07:15:00', '08:20:00'),
(24, 'Chủ nhật', '12:15:00', '14:20:00'),
(25, '7', '12:15:00', '14:20:00'),
(26, '7', '01:15:00', '03:20:00'),
(27, 'Chủ nhật', '01:15:00', '03:20:00'),
(28, '3', '12:15:00', '14:20:00'),
(29, '5', '12:15:00', '14:20:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `sex` varchar(10) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `subscribers`
--

INSERT INTO `subscribers` (`id`, `name`, `birthday`, `sex`, `address`, `phone`, `email`) VALUES
(1, 'Lê Văn A', '2000-04-09', 'Nam', 'Xã Biển Bạch Đông, Huyện Thới Bình, Tỉnh Cà Mau', '0909899020', 'sdad@gmail.com'),
(3, 'kmds', '2023-09-21', 'nam', 'ádasmda', '009090', 'kasmkadasdnsakd'),
(4, 'ppp', '2023-10-02', 'Nam', NULL, '090808', 'dâds'),
(6, 'mmqq', '2023-10-08', 'Nữ', NULL, '092212', '213'),
(7, 'mmqq', '1899-11-28', 'Nữ', NULL, '0928819298', '213m@mm.com');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `personnel_id` (`personnel_id`),
  ADD UNIQUE KEY `subscribers_id` (`subscribers_id`);

--
-- Chỉ mục cho bảng `accounts_notification`
--
ALTER TABLE `accounts_notification`
  ADD KEY `accounts_id` (`accounts_id`);

--
-- Chỉ mục cho bảng `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subscribers_id` (`subscribers_id`);

--
-- Chỉ mục cho bảng `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subscribers_id` (`subscribers_id`);

--
-- Chỉ mục cho bảng `billing_information`
--
ALTER TABLE `billing_information`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `regInfo_id` (`regInfo_id`),
  ADD KEY `personnel_id` (`personnel_id`);

--
-- Chỉ mục cho bảng `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_id` (`rooms_id`),
  ADD KEY `courses_id` (`courses_id`),
  ADD KEY `personnel_id` (`personnel_id`);

--
-- Chỉ mục cho bảng `class_notification`
--
ALTER TABLE `class_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- Chỉ mục cho bảng `class_studytime`
--
ALTER TABLE `class_studytime`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `studyTime_id` (`studyTime_id`);

--
-- Chỉ mục cho bảng `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `promotionTime_id` (`promotionTime_id`);

--
-- Chỉ mục cho bảng `courses_progroups`
--
ALTER TABLE `courses_progroups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_id` (`courses_id`),
  ADD KEY `promotionGroups_id` (`promotionGroups_id`);

--
-- Chỉ mục cho bảng `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`courses_id`),
  ADD KEY `posts_id` (`posts_id`),
  ADD KEY `files_ibfk_1` (`subscribers_id`),
  ADD KEY `personnel_id` (`personnel_id`);

--
-- Chỉ mục cho bảng `medium_score`
--
ALTER TABLE `medium_score`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subscribers_id` (`subscribers_id`);

--
-- Chỉ mục cho bảng `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `position_id` (`position_id`);

--
-- Chỉ mục cho bảng `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `promotion_groups`
--
ALTER TABLE `promotion_groups`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `promotion_time`
--
ALTER TABLE `promotion_time`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `registration_information`
--
ALTER TABLE `registration_information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subscribers_id` (`subscribers_id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_rooms` (`name`);

--
-- Chỉ mục cho bảng `study_time`
--
ALTER TABLE `study_time`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `assessment`
--
ALTER TABLE `assessment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `billing_information`
--
ALTER TABLE `billing_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `class_notification`
--
ALTER TABLE `class_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `class_studytime`
--
ALTER TABLE `class_studytime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT cho bảng `courses_progroups`
--
ALTER TABLE `courses_progroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT cho bảng `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT cho bảng `medium_score`
--
ALTER TABLE `medium_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `position`
--
ALTER TABLE `position`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `promotion_groups`
--
ALTER TABLE `promotion_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `promotion_time`
--
ALTER TABLE `promotion_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `registration_information`
--
ALTER TABLE `registration_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `study_time`
--
ALTER TABLE `study_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`subscribers_id`) REFERENCES `subscribers` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `accounts_notification`
--
ALTER TABLE `accounts_notification`
  ADD CONSTRAINT `accounts_notification_ibfk_1` FOREIGN KEY (`accounts_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `assessment`
--
ALTER TABLE `assessment`
  ADD CONSTRAINT `assessment_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `assessment_ibfk_2` FOREIGN KEY (`subscribers_id`) REFERENCES `subscribers` (`id`) ON DELETE NO ACTION;

--
-- Các ràng buộc cho bảng `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`subscribers_id`) REFERENCES `subscribers` (`id`) ON DELETE NO ACTION;

--
-- Các ràng buộc cho bảng `billing_information`
--
ALTER TABLE `billing_information`
  ADD CONSTRAINT `billing_information_ibfk_1` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `billing_information_ibfk_2` FOREIGN KEY (`regInfo_id`) REFERENCES `registration_information` (`id`) ON DELETE NO ACTION;

--
-- Các ràng buộc cho bảng `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`rooms_id`) REFERENCES `rooms` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `class_ibfk_2` FOREIGN KEY (`courses_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_ibfk_3` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `class_notification`
--
ALTER TABLE `class_notification`
  ADD CONSTRAINT `class_notification_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `class_studytime`
--
ALTER TABLE `class_studytime`
  ADD CONSTRAINT `class_studytime_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_studytime_ibfk_2` FOREIGN KEY (`studyTime_id`) REFERENCES `study_time` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`promotionTime_id`) REFERENCES `promotion_time` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `courses_progroups`
--
ALTER TABLE `courses_progroups`
  ADD CONSTRAINT `courses_progroups_ibfk_1` FOREIGN KEY (`courses_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `courses_progroups_ibfk_2` FOREIGN KEY (`promotionGroups_id`) REFERENCES `promotion_groups` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`subscribers_id`) REFERENCES `subscribers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_ibfk_2` FOREIGN KEY (`courses_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `files_ibfk_3` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `files_ibfk_4` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `medium_score`
--
ALTER TABLE `medium_score`
  ADD CONSTRAINT `medium_score_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `medium_score_ibfk_2` FOREIGN KEY (`subscribers_id`) REFERENCES `subscribers` (`id`) ON DELETE NO ACTION;

--
-- Các ràng buộc cho bảng `personnel`
--
ALTER TABLE `personnel`
  ADD CONSTRAINT `personnel_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `registration_information`
--
ALTER TABLE `registration_information`
  ADD CONSTRAINT `registration_information_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `registration_information_ibfk_2` FOREIGN KEY (`subscribers_id`) REFERENCES `subscribers` (`id`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
