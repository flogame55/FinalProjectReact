const CATEGORY_LABELS = {
  beauty: 'ความงาม', fragrances: 'น้ำหอม', furniture: 'เฟอร์นิเจอร์', groceries: 'ของกินและของใช้',
  'home-decoration': 'ของแต่งบ้าน', 'kitchen-accessories': 'อุปกรณ์ครัว', laptops: 'แล็ปท็อป',
  'mens-shirts': 'เสื้อผ้าผู้ชาย', 'mens-shoes': 'รองเท้าผู้ชาย', 'mens-watches': 'นาฬิกาผู้ชาย',
  'mobile-accessories': 'อุปกรณ์มือถือ', motorcycle: 'มอเตอร์ไซค์', 'skin-care': 'ดูแลผิว',
  smartphones: 'สมาร์ทโฟน', 'sports-accessories': 'กีฬาและกิจกรรม', sunglasses: 'แว่นกันแดด',
  tablets: 'แท็บเล็ต', tops: 'เสื้อท่อนบน', vehicle: 'ยานยนต์', 'womens-bags': 'กระเป๋าผู้หญิง',
  'womens-dresses': 'เดรสผู้หญิง', 'womens-jewellery': 'เครื่องประดับ', 'womens-shoes': 'รองเท้าผู้หญิง',
  'womens-watches': 'นาฬิกาผู้หญิง', electronics: 'อิเล็กทรอนิกส์', fashion: 'แฟชั่น', lifestyle: 'ไลฟ์สไตล์',
  home: 'ของใช้ในบ้าน', sports: 'กีฬาและกิจกรรม', pets: 'สัตว์เลี้ยง', office: 'เครื่องเขียนและออฟฟิศ',
  food: 'อาหารและเครื่องดื่ม', toys: 'ของเล่นและงานอดิเรก',
}

export function getCategoryLabel(category) {
  if (!category) return 'ทั่วไป'
  return CATEGORY_LABELS[category] || category.split('-').map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')
}

export function formatPrice(price) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(price) || 0)
}
