require('dotenv').config({ path: '.env.production' });
const dns = require('dns');
const mongoose = require('mongoose');

dns.setServers(['8.8.8.8', '1.1.1.1']);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const People    = require('./models/people');
  const Expertise = require('./models/expertise');
  const UserType  = require('./models/userTypes');
  const Users     = require('./models/users');

  // Clear existing data
  const mongoose_ = require('mongoose');
  await mongoose_.connection.dropDatabase();
  console.log('Database cleared');

  // Seed People
  await Promise.all([
    People.add({ name: 'Cynthia Gabriel', name_th: 'Cynthia Gabriel', project: 'Center for International Private Enterprise', project_th: 'ศูนย์วิสาหกิจเอกชนระหว่างประเทศ', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Senior Anti-Corruption Advisor/Consultant for ASEAN Region', position_th: 'ที่ปรึกษาอาวุโสด้านต่อต้านการทุจริตสำหรับภูมิภาคอาเซียน', network: '', tags: [{ label: 'OPEN DATA' }, { label: 'Public Procurement' }], email: 'cynthiagabriel2@gmail.com', note: 'UNODC ไม่ชอบร่วมงานด้วย' }),
    People.add({ name: 'Khairil Yusof', name_th: 'Khairil Yusof', project: 'Sinar Project', project_th: 'โครงการ Sinar', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Investigative Data Journalist', position_th: 'นักข่าวสืบสวนข้อมูล', network: 'Connect with JAC', tags: [{ label: 'OPEN DATA' }], email: 'khairil.yusof@sinarproject.org', note: 'SEA-ACN OPEN DATA Phase 1 -2  ทำงานร่วมกับ KRAC เป็นหลัก' }),
    People.add({ name: 'Nurhayati Nordin', name_th: 'Nurhayati Nordin', project: 'Rasuah Busters', project_th: 'Rasuah Busters', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Chief Executive Officer', position_th: 'ประธานเจ้าหน้าที่บริหาร', network: '', tags: [{ label: 'Public Procurement' }], email: 'yatt.sinar4malaysia@gmail.com', note: '' }),
    People.add({ name: 'Pushpan Murugiah', name_th: 'Pushpan Murugiah', project: 'Center to Combat Corruption and Cronyism (C4 Center)', project_th: 'ศูนย์ต่อต้านการทุจริตและระบบอุปถัมภ์ (C4 Center)', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Executive Director', position_th: 'ผู้อำนวยการบริหาร', network: '', tags: [{ label: 'Public Procurement' }, { label: 'OPEN DATA' }], email: 'medzjoe@gmail.com', note: 'เคยร่วมจัด workshop' }),
    People.add({ name: 'Pok Bopha Marina', name_th: 'Pok Bopha Marina', project: 'Transparency International Cambodia', project_th: 'Transparency International กัมพูชา', location: 'Phnom Penh', country: 'Cambodia', position: 'Chairperson of the Board of Directors', position_th: 'ประธานคณะกรรมการบริหาร', network: '', tags: [], email: 'marinapok@ticambodia.org', note: 'มาแทน Pisey ที่ถูกให้ออก  พี่ณิกเจอที่งาน TI international Colombo' }),
    People.add({ name: 'Joy Galera Aceron', name_th: 'Joy Galera Aceron', project: 'Government Watch (G-Watch)', project_th: 'G-Watch (จับตาภาครัฐ)', location: 'Manila', country: 'Philippines', position: 'Convenor-Director', position_th: 'ผู้อำนวยการ', network: '', tags: [{ label: 'Whistle Blower' }, { label: 'Public Procurement' }], email: 'joyaceron@yahoo.com', note: '' }),
    People.add({ name: 'Justin Jarret', name_th: 'Justin Jarret', project: 'Transparency International Malaysia', project_th: 'Transparency International มาเลเซีย', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Manager', position_th: 'ผู้จัดการ', network: '', tags: [{ label: 'Business Intergrity' }], email: 'mmohan@transparency.org.my', note: '' }),
    People.add({ name: 'Nur Afrina Mohd Jafri', name_th: 'Nur Afrina Mohd Jafri', project: 'Transparency International Malaysia', project_th: 'Transparency International มาเลเซีย', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Communication and Project Executive', position_th: 'เจ้าหน้าที่สื่อสารและโครงการ', network: '', tags: [{ label: 'Public Procurement' }], email: 'nurafrina@transparency.org.my', note: '' }),
    People.add({ name: 'Raymon Ram Ram', name_th: 'Raymon Ram Ram', project: 'Transparency International Malaysia', project_th: 'Transparency International มาเลเซีย', location: 'Kuala Lumpur', country: 'Malaysia', position: 'President', position_th: 'ประธาน', network: '', tags: [], email: 'raymon@transparency.org.my', note: '' }),
    People.add({ name: 'Laurentino Alves', name_th: 'Laurentino Alves', project: 'Core Group Transparency/PWYP-Timor-Leste (CGT/PWYP-TL)', project_th: 'กลุ่มความโปร่งใส/PWYP ติมอร์-เลสเต', location: 'Dili', country: 'Timor-leste', position: 'Program Manager', position_th: 'ผู้จัดการโครงการ', network: '', tags: [{ label: 'Business Intergrity' }, { label: 'Public Procurement' }], email: 'laurentinoalves.cgttl23@gmail.com', note: 'เคยมีปัญหาเรื่องไม่พกเงินมาร่วมงาน เคยยืมเงิน UNODC' }),
    People.add({ name: 'Almas Sjafrina', name_th: 'Almas Sjafrina', project: 'Indonesia Corruption Watch', project_th: 'Indonesia Corruption Watch', location: 'Jakarta', country: 'Indonesia', position: 'Head of the Public Services and Bureaucratic Reform Divison', position_th: 'หัวหน้าฝ่ายบริการสาธารณะและการปฏิรูประบบราชการ', network: '', tags: [{ label: 'Whistle Blower' }], email: 'almas@antikorupsi.org', note: '' }),
    People.add({ name: 'Siti Juliantari Rachman', name_th: 'Siti Juliantari Rachman', project: 'Indonesia Corruption Watch', project_th: 'Indonesia Corruption Watch', location: 'Jakarta', country: 'Indonesia', position: 'Deputy Coordinator', position_th: 'รองผู้ประสานงาน', network: '', tags: [], email: 'siti.juliantari@antikorupsi.org', note: 'เข้าร่วม network  แต่ไม่เคยเข้าร่วมงาน' }),
    People.add({ name: 'Pana Ratanabanangkoon', name_th: 'Pana Ratanabanangkoon', project: 'International Collective Action Network (I-CAN Fight Corruption)', project_th: 'เครือข่ายความร่วมมือสากล (I-CAN)', location: 'Bangkok', country: 'Thailand', position: 'Executive Director', position_th: 'ผู้อำนวยการบริหาร', network: '', tags: [{ label: 'Business Intergrity' }], email: 'peter.ratana@gmail.com', note: 'พี่ไผ่สนิทกับพี่ณิก พี่บิ๊ก เคยอยู่ THAI CAC' }),
    People.add({ name: 'Suppawit Kaewkhunok', name_th: 'Suppawit Kaewkhunok', project: 'Knowledge Hub for Regional Anti-Corruption and Good Governance Collaboration (KRAC)', project_th: 'ศูนย์ความรู้ KRAC', location: 'Bangkok', country: 'Thailand', position: 'Manager', position_th: 'ผู้จัดการ', network: '', tags: [], email: 'suppawit.kaew@gmail.com', note: '' }),
    People.add({ name: 'Thanisara Ruangdej', name_th: 'Thanisara Ruangdej', project: 'Wevis (WEVIS DEMO CO., LTD.)', project_th: 'WeVis (บริษัท WeVis Demo จำกัด)', location: 'Bangkok', country: 'Thailand', position: 'CEO and Founder', position_th: 'ประธานเจ้าหน้าที่บริหารและผู้ก่อตั้ง', network: '', tags: [{ label: 'OPEN DATA' }], email: 'thanisara@punchup.world', note: 'ทำงานร่วมกับ HAND KRAC เป็นหลัก' }),
    People.add({ name: 'Witee Phusitasai', name_th: 'Witee Phusitasai', project: 'Wevis (WEVIS DEMO CO., LTD.)', project_th: 'WeVis (บริษัท WeVis Demo จำกัด)', location: 'Bangkok', country: 'Thailand', position: 'Co-founder and Technical Lead of WeVis', position_th: 'ผู้ร่วมก่อตั้งและหัวหน้าฝ่ายเทคนิค WeVis', network: '', tags: [{ label: 'OPEN DATA' }], email: 'withee@punchup.world', note: 'SEA-ACN OPEN DATA Phase 1 -2  ทำงานร่วมกับ KRAC เป็นหลัก' }),
    People.add({ name: 'Nattapat Neokul', name_th: 'Nattapat Neokul', project: 'HAND Social Enterprise', project_th: 'HAND Social Enterprise', location: 'Bangkok', country: 'Thailand', position: 'Head of Open Data for Transparency', position_th: 'หัวหน้าฝ่ายข้อมูลเปิดเพื่อความโปร่งใส', network: '', tags: [], email: 'nattapat.neokul@gmail.com', note: '' }),
    People.add({ name: 'Kittidej Chantangkul', name_th: 'Kittidej Chantangkul', project: 'Anti-Corruption Organization of Thailand (ACT)', project_th: 'องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)', location: 'Bangkok', country: 'Thailand', position: 'Director', position_th: 'ผู้อำนวยการ', network: '', tags: [{ label: 'OPEN DATA' }, { label: 'Public Procurement' }], email: 'Kittidej@anticorruption.in.th', note: 'ที่ปรึกษาในโครงการ PEPs Phase 1 จาก ACT' }),
    People.add({ name: 'Delgermaa Boldbaatar', name_th: 'Delgermaa Boldbaatar', project: 'Mongolia Data Club', project_th: 'Mongolia Data Club', location: 'Ulaanbaatar', country: 'Mongolia', position: 'Founder and Researcher', position_th: 'ผู้ก่อตั้งและนักวิจัย', network: '', tags: [{ label: 'OPEN DATA' }], email: 'delmabold@gmail.com', note: 'UNODC แนะนำให้เข้าร่วมเครือข่าย เพราะทำเรื่องข้อมูล BO PEPs' }),
    People.add({ name: 'Kiara Kijburana', name_th: 'Kiara Kijburana', project: 'Chandler Institute of Governance', project_th: 'Chandler Institute of Governance', location: 'Singapore', country: 'Singapore', position: 'Manager, Government Projects, Legal Affairs and Communications', position_th: 'ผู้จัดการโครงการภาครัฐ กิจการกฎหมาย และการสื่อสาร', network: '', tags: [], email: 'kiara.kijburana@chandlerinstitute.org', note: 'Chandler ให้การสนับสนุน KRAC ในการจัดงาน SEA - ACN Rountable 2024' }),
    People.add({ name: 'Nicholas Yee', name_th: 'Nicholas Yee', project: 'Chandler Institute of Governance', project_th: 'Chandler Institute of Governance', location: 'Singapore', country: 'Singapore', position: 'Director of Global Partnerships', position_th: 'ผู้อำนวยการฝ่ายความร่วมมือระดับโลก', network: '', tags: [{ label: 'Business Intergrity' }], email: 'nicholas.yee@chandlerinstitute.org', note: 'Chandler ให้เงินสนับสนุนการจัดงาน 30k  พูดจบงาน roundtable 2025' }),
    People.add({ name: 'Kee Hean Soh', name_th: 'Kee Hean Soh', project: 'Singapore University of Social Sciences (SUSS)', project_th: 'มหาวิทยาลัยสังคมศาสตร์สิงคโปร์ (SUSS)', location: 'Singapore', country: 'Singapore', position: 'Associate Professor', position_th: 'รองศาสตราจารย์', network: '', tags: [{ label: 'Public Procurement' }], email: 'khsoh@suss.edu.sg', note: '' }),
    People.add({ name: 'Him Yun', name_th: 'Him Yun', project: 'The Coalition for Integrity and Social Accountability (CISA)', project_th: 'แนวร่วมเพื่อความซื่อสัตย์และความรับผิดชอบทางสังคม (CISA)', location: 'Phnom Penh', country: 'Cambodia', position: 'Executive Director', position_th: 'ผู้อำนวยการบริหาร', network: '', tags: [], email: 'cisaed@proton.me', note: 'เข้าร่วม network  แต่ไม่เคยเข้าร่วมงาน' }),
    People.add({ name: 'Arran Ridley', name_th: 'Arran Ridley', project: 'The East-West Management Institute - Open Development Initiative', project_th: 'สถาบันบริหารจัดการตะวันออก-ตะวันตก (EWMI-ODI)', location: 'Jakarta', country: 'Indonesia', position: 'Research and Editorial Manager', position_th: 'ผู้จัดการฝ่ายวิจัยและบรรณาธิการ', network: '', tags: [], email: 'arran@ewmi-odi.org', note: 'เคยแนะนำเครื่องมือกับทีมดาต้า  ทำเรื่อง open data กับประเด็นแม่น้ำโขง' }),
    People.add({ name: 'Saowalak Jingjungvisut', name_th: 'Saowalak Jingjungvisut', project: 'The East-West Management Institute - Open Development Initiative', project_th: 'สถาบันบริหารจัดการตะวันออก-ตะวันตก (EWMI-ODI)', location: 'Bangkok', country: 'Thailand', position: 'Partnerships and Communications Manager', position_th: 'ผู้จัดการฝ่ายความร่วมมือและการสื่อสาร', network: '', tags: [], email: 'saowalakj@ewmi-odi.org', note: 'เคยแนะนำเครื่องมือกับทีมดาต้า  ทำเรื่อง open data กับประเด็นแม่น้ำโขง' }),
    People.add({ name: 'Natalia Carfi', name_th: 'Natalia Carfi', project: 'The Open Data Charter', project_th: 'กฎบัตรข้อมูลเปิด', location: '', country: '', position: 'Executive Director', position_th: 'ผู้อำนวยการบริหาร', network: '', tags: [], email: 'nati@opendatacharter.org', note: 'เข้าร่วม network  แต่ไม่เคยเข้าร่วมงาน  พี่ณิกเคยคุยอีเมล์' }),
    People.add({ name: "Ato 'Lekinawa' Costa", name_th: "Ato 'Lekinawa' Costa", project: 'Association Journalist of Timor-Leste (AJTL)', project_th: 'สมาคมนักข่าวติมอร์-เลสเต (AJTL)', location: 'Dili', country: 'Timor-leste', position: 'Co-founder', position_th: 'ผู้ร่วมก่อตั้ง', network: '', tags: [{ label: 'Public Procurement' }], email: 'fantoniodac@gmail.com', note: 'เข้าร่วม network หลังจากเข้าร่วมงาน webinar 2024' }),
    People.add({ name: 'Patrick Beaucamp', name_th: 'Patrick Beaucamp', project: 'Bpm-conseil', project_th: 'Bpm-conseil', location: 'Paris', country: 'France', position: 'Ceo', position_th: 'ประธานเจ้าหน้าที่บริหาร', network: '', tags: [{ label: 'OPEN DATA' }], email: 'patrick.beaucamp@gmail.com', note: 'เข้าร่วม network หลังจากเข้าร่วมงาน webinar 2025' }),
    People.add({ name: 'Geetha A Rubasundram', name_th: 'Geetha A Rubasundram', project: 'Advicecube', project_th: 'Advicecube', location: 'Manama', country: 'Bahrain', position: 'Director', position_th: 'ผู้อำนวยการ', network: '', tags: [{ label: 'OPEN DATA' }], email: 'geetharubasundram@yahoo.com', note: 'เข้าร่วม network หลังจากเข้าร่วมงาน webinar 2026' }),
    People.add({ name: 'Kevin I.J. Yeh', name_th: 'Kevin I.J. Yeh', project: 'Transparency International Taiwan', project_th: 'Transparency International ไต้หวัน', location: 'Taipei', country: 'Taiwan', position: 'Chair of the Board', position_th: 'ประธานคณะกรรมการ', network: '', tags: [], email: 'kevinyeh88180@gmail.com', note: 'เข้าร่วม network  แต่ไม่เคยเข้าร่วมงาน' }),
    People.add({ name: 'Raymon Ram', name_th: 'Raymon Ram', project: 'Graymatter Forensic Advisory Sdn Bhd', project_th: 'Graymatter Forensic Advisory Sdn Bhd', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Managing Principal', position_th: 'หุ้นส่วนผู้จัดการ', network: '', tags: [], email: 'raymon@graymatterfa.com', note: 'พี่ไนส์เคยเจอตอนเข้าร่วมงาน UN Workshop' }),
    People.add({ name: 'Alvin Nicola', name_th: 'Alvin Nicola', project: 'Transparency International Indonesia', project_th: 'Transparency International อินโดนีเซีย', location: 'Jakarta', country: 'Indonesia', position: 'Transparency International Indonesia', position_th: 'ผู้แทน Transparency International Indonesia', network: '', tags: [{ label: 'OPEN DATA' }, { label: 'Public Procurement' }], email: 'anicola@ti.or.id', note: 'SEA-ACN OPEN DATA PEPs Phase 2  ทำงานร่วมกับ KRAC เป็นหลัก' }),
    People.add({ name: 'João Boavida', name_th: 'João Boavida', project: 'Centre of Studies for Peace and Development', project_th: 'ศูนย์ศึกษาสันติภาพและการพัฒนา', location: 'Dili', country: 'Timor Leste', position: 'Executive Director', position_th: 'ผู้อำนวยการบริหาร', network: '', tags: [], email: 'joao.boavida@tl-cepad.org', note: 'เข้าร่วม network  แต่ไม่เคยเข้าร่วมงาน  UNODC แนะนำให้เข้าร่วมเครือข่าย' }),
    People.add({ name: 'David Kittituch Sriamrung', name_th: 'David Kittituch Sriamrung', project: "People's Empowerment Foundation (PEF)", project_th: 'มูลนิธิเสริมพลังประชาชน (PEF)', location: 'Bangkok', country: 'Thailand', position: 'Project Supervisor', position_th: 'ผู้ดูแลโครงการ', network: '', tags: [], email: 'kittituch.sriamrung@gmail.com', note: 'ทำเรื่อง human right และ Corruption  ทำงานร่วมกับ KRAC ขอคำปรึกษา HAND' }),
    People.add({ name: 'Krongjai Saeng-ngern', name_th: 'Krongjai Saeng-ngern', project: 'International Narcotics and Law Enforcement Affairs Section (INL)', project_th: 'สำนักงานยาเสพติดและกฎหมายระหว่างประเทศ (INL)', location: 'Bangkok', country: 'Thailand', position: 'Program Specialist', position_th: 'ผู้เชี่ยวชาญโครงการ', network: '', tags: [], email: 'krongjai@state.gov', note: 'เคยให้การสนับสนุนค่าสถานที่ S31 จัดงาน SEA-ACN rountable 2024  ต้องเชิญเข้าร่วมงานที่ KRAC จัดทุกครั้งเพื่อให้เขามาดูเรื่องการให้ทุน' }),
    People.add({ name: 'Dexter Arvin Yang', name_th: 'Dexter Arvin Yang', project: 'GoodGovPH Inc', project_th: 'GoodGovPH Inc', location: 'Manila', country: 'Philippines', position: 'Executive Director', position_th: 'ผู้อำนวยการบริหาร', network: '', tags: [], email: 'dexterarvinyang@gmail.com', note: '' }),
    People.add({ name: 'MINH DUC PHAN', name_th: 'MINH DUC PHAN', project: 'Department of Science Management and International Cooperation, Academy of Journalism and Communication, Ho Chi Minh National Academy of Politics', project_th: 'Department of Science Management and International Cooperation, Academy of Journalism and Communication, Ho Chi Minh National Academy of Politics', location: 'Ho Chi Minh City', country: 'Vietnam', position: 'Associate Prof.Dr.', position_th: 'รองศาสตราจารย์ ดร.', network: '', tags: [], email: 'phanminhduc.ajc@gmail.com', note: '' }),
    People.add({ name: 'Anan Bouapha', name_th: 'Anan Bouapha', project: 'Proud To Be Us Laos', project_th: 'Proud To Be Us ลาว', location: 'Vientiane', country: 'Laos', position: 'Founder/President', position_th: 'ผู้ก่อตั้ง/ประธาน', network: '', tags: [{ label: 'Public Procurement' }], email: 'proudtobeus.laos@gmail.com', note: '' }),
    People.add({ name: 'Edmund Terence Gomez', name_th: 'Edmund Terence Gomez', project: 'Universiti Malaya', project_th: 'มหาวิทยาลัยมาลายา', location: 'Kuala Lumpur', country: 'Malaysia', position: 'Professor Emeritus', position_th: 'ศาสตราจารย์กิตติคุณ', network: '', tags: [{ label: 'Public Procurement' }], email: 'etgomez@um.edu.my', note: '' }),
    People.add({ name: 'Linda Novi Trianita', name_th: 'Linda Novi Trianita', project: 'Journalists Against Corruption (JAC), Tempo magazine', project_th: 'นักข่าวต่อต้านการทุจริต (JAC), นิตยสาร Tempo', location: 'Jakarta', country: 'Indonesia', position: 'Journalist', position_th: 'นักข่าว', network: 'JAC', tags: [], email: 'lindatrianita@gmail.com', note: '' }),
    People.add({ name: 'Kamolwan (Ling) Panyasevanamit', name_th: 'Kamolwan (Ling) Panyasevanamit', project: 'Open Government Partnership', project_th: 'ความร่วมมือรัฐบาลเปิด (OGP)', location: 'Bangkok', country: 'Thailand', position: 'Advisor', position_th: 'ที่ปรึกษา', network: '', tags: [], email: 'ling.panyasevanamit@opengovpartnership.org', note: 'รู้จักพี่ณิกพี่บิ๊กเป็นการส่วนตัว' }),
    People.add({ name: 'Horacio Severino', name_th: 'Horacio Severino', project: 'PCIJ', project_th: 'PCIJ (Philippine Center for Investigative Journalism)', location: 'Manila', country: 'Philippines', position: 'Journalist', position_th: 'นักข่าว', network: 'JAC', tags: [], email: 'howieseverino@gmail.com', note: '' }),
    People.add({ name: 'Nop Vy', name_th: 'Nop Vy', project: 'Cambodian Journalists Alliance Association', project_th: 'สมาคมพันธมิตรนักข่าวกัมพูชา', location: 'Phnom Penh', country: 'Cambodia', position: 'Executive Director', position_th: 'ผู้อำนวยการบริหาร', network: 'JAC', tags: [], email: 'ed@camboja.net', note: '' }),
  ]);
  console.log('Seeded: People (43)');

  // Seed Expertise
  await Promise.all([
    Expertise.create('Open Data', 'การเปิดเผยข้อมูลสาธารณะเพื่อให้ทุกคนเข้าถึงและนำไปใช้ได้'),
    Expertise.create('Public Procurement', 'การจัดซื้อจัดจ้างภาครัฐอย่างโปร่งใสและตรวจสอบได้'),
    Expertise.create('WhistleBlower', 'การแจ้งเบาะแสและปกป้องผู้เปิดเผยข้อมูลทุจริต'),
    Expertise.create('Business integrity', 'ธรรมาภิบาลและจริยธรรมทางธุรกิจ'),
  ]);
  console.log('Seeded: Expertise (4)');

  // Seed UserTypes
  await Promise.all([
    UserType.create('User', ''),
    UserType.create('Admin', ''),
  ]);
  console.log('Seeded: UserTypes (2)');

  // Seed Users
  await Promise.all([
    Users.create({ name: 'Admin01',      email: 'admin01@hand.co.th',      type: 'Admin', password: 'changeme' }),
    Users.create({ name: 'Suppaut',      email: 'suppaut@hand.co.th',      type: 'User',  password: 'czU-8w' }),
    Users.create({ name: 'Bhalangrata',  email: 'bhalangrata@hand.co.th',  type: 'User',  password: 'rHeXkA' }),
    Users.create({ name: 'Yuthana',      email: 'yuthana@hand.co.th',      type: 'User',  password: '8v8MKg' }),
    Users.create({ name: 'Nanwadee',     email: 'nanwadee@hand.co.th',     type: 'User',  password: 'js2vAA' }),
    Users.create({ name: 'Patcharee',    email: 'patcharee@hand.co.th',    type: 'User',  password: '3OzErQ' }),
    Users.create({ name: 'Supatja',      email: 'supatja@hand.co.th',      type: 'User',  password: 'oD_VTA' }),
    Users.create({ name: 'Charassri',    email: 'charassri@hand.co.th',    type: 'User',  password: 'mhryXw' }),
    Users.create({ name: 'Rakpa',        email: 'rakpa@hand.co.th',        type: 'User',  password: '8gTaUg' }),
    Users.create({ name: 'Wasupol',      email: 'wasupol@hand.co.th',      type: 'User',  password: '4P7wRQ' }),
    Users.create({ name: 'Saranchanok',  email: 'saranchanok@hand.co.th',  type: 'User',  password: '4AjIMA' }),
    Users.create({ name: 'Thareeya',     email: 'thareeya@hand.co.th',     type: 'User',  password: 'JJ938A' }),
    Users.create({ name: 'Jatupron',     email: 'jatupron@hand.co.th',     type: 'User',  password: 'zkgyGg' }),
    Users.create({ name: 'Thanakan',     email: 'thanakan@hand.co.th',     type: 'User',  password: 'I3cWSQ' }),
    Users.create({ name: 'Suphachai',    email: 'suphachai@hand.co.th',    type: 'User',  password: 'bmbCPg' }),
    Users.create({ name: 'Suppawit',     email: 'suppawit@hand.co.th',     type: 'User',  password: '-3WZ_Q' }),
    Users.create({ name: 'Sasathorn',    email: 'sasathorn@hand.co.th',    type: 'User',  password: 'UxCAGw' }),
  ]);
  console.log('Seeded: Users (17)');

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
