const app = document.querySelector('#app');
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#primary-nav');
const EXAM_YEARS = ['2025', '2024', '2023', '2022', '2021', '2020'];
let language = localStorage.getItem('bacii-language') === 'en' ? 'en' : 'km';

const english = new Map(Object.entries({
  'ស្វែងរកលទ្ធផលបាក់ឌុប': 'BacII Result Finder', 'លទ្ធផលបាក់ឌុប': 'BacII results',
  'ទំព័រដើម': 'Home', 'ស្វែងរកសិស្ស': 'Student Search', 'ស្វែងរកសាលា': 'School Search', 'អំពីយើង': 'About', 'ទំនាក់ទំនង': 'Contact',
  'តំណភ្ជាប់': 'Explore', 'របៀបប្រើប្រាស់': 'How to Search', 'ជំនួយ': 'Help', 'រាយការណ៍ព័ត៌មានខុស': 'Report Incorrect Information', 'ឯកជនភាព': 'Privacy',
  'ជួយសិស្ស និងគ្រួសារ ស្វែងរកព័ត៌មានលទ្ធផលប្រឡងបានងាយស្រួល និងឆាប់រហ័ស។': 'Helping students and families find examination results quickly and easily.',
  'វេទិកានេះមិនមែនជាសេវាផ្លូវការរបស់ក្រសួងទេ លុះត្រាតែមានការអនុញ្ញាតជាក់លាក់។': 'This platform is not an official Ministry service unless explicitly authorized.',
  'ទិន្នន័យលទ្ធផលប្រឡងឆ្នាំ ២០២០–២០២៥': 'Examination records from 2020–2025',
  'ស្វែងរកលទ្ធផលបាក់ឌុបបានងាយ និងរហ័ស': 'Find BacII results quickly and easily',
  'ស្វែងរកតាមឈ្មោះ ថ្ងៃខែឆ្នាំកំណើត លេខបេក្ខជន ឬសាលា។ គាំទ្រការស្វែងរកជាភាសាខ្មែរ និងប្រើបានល្អលើទូរស័ព្ទ។': 'Search by name, date of birth, candidate number, or school. Khmer names are fully supported on mobile and desktop.',
  'ឈ្មោះសិស្ស': 'Student name', 'លេខបេក្ខជន': 'Candidate number', 'ថ្ងៃខែឆ្នាំកំណើត': 'Date of birth', 'សាលារៀន': 'School',
  'ឆ្នាំប្រឡង': 'Exam year', 'គ្រប់ឆ្នាំ': 'All years', 'ស្វែងរកឥឡូវ': 'Search now', 'ស្វែងរកកម្រិតខ្ពស់': 'Advanced search',
  'ឈ្មោះពេញ ឬផ្នែកណាមួយនៃឈ្មោះ': 'Full name or part of a name', 'អាចវាយនាមត្រកូល នាមខ្លួន ឬឈ្មោះពេញ។': 'Enter a family name, given name, or full name.',
  'លេខបេក្ខជន / លេខសម្គាល់': 'Candidate / student ID', 'បញ្ចូលលេខជាខ្មែរ ឬអង់គ្លេស។': 'Enter Khmer or English numerals.',
  'វាយតាមទម្រង់ដែលបានបោះពុម្ពក្នុងបញ្ជីលទ្ធផល។': 'Use the format printed in the examination record.',
  'ឈ្មោះសាលារៀន': 'School name', 'វាយឈ្មោះពេញ ឬផ្នែកណាមួយនៃឈ្មោះសាលា។': 'Enter a full school name or part of it.',
  'ស្វែងរករហ័ស': 'Quick search', 'ជ្រើសរើសវិធីដែលងាយសម្រាប់អ្នក': 'Choose the easiest way to search',
  'ចាប់ផ្តើមដោយព័ត៌មានតែមួយ ឬប្រើតម្រងច្រើនដើម្បីទទួលបានលទ្ធផលកាន់តែច្បាស់។': 'Start with one detail or combine filters for more accurate results.',
  'ស្វែងរកកម្រិតខ្ពស់': 'Advanced student search', 'ស្វែងរកលេខបេក្ខជន': 'Search by candidate number',
  'ប្រើឈ្មោះ ថ្ងៃកំណើត លេខបេក្ខជន ឬបញ្ចូលតម្រងរួមគ្នា។': 'Use a name, birthday, candidate number, or combined filters.',
  'ស្វែងរកកំណត់ត្រាជាក់លាក់ដោយលេខសម្គាល់បេក្ខជន ប្រសិនបើមានក្នុងទិន្នន័យ។': 'Find a specific record using its candidate number when available.',
  'រកសាលារៀន ហើយមើលបញ្ជីសិស្ស និងលទ្ធផលដែលមាន។': 'Find a school and browse its available students and results.',
  'ត្រឹមតែ ៣ ជំហាន': 'Only 3 steps', 'បញ្ចូលព័ត៌មាន': 'Enter information', 'ស្វែងរកកំណត់ត្រា': 'Search records', 'មើលលទ្ធផល': 'View the result',
  'វាយឈ្មោះ ថ្ងៃកំណើត លេខបេក្ខជន ឬសាលា។': 'Enter a name, birthday, candidate number, or school.',
  'ប្រព័ន្ធនឹងផ្គូផ្គងព័ត៌មានជាមួយទិន្នន័យដែលមាន។': 'The system matches your details with available records.',
  'បើកព័ត៌មានលម្អិត និងមើលនិទ្ទេសតាមមុខវិជ្ជា។': 'Open the record to view grades by subject.',
  'កំណត់ត្រាសិស្ស': 'Student records', 'ឆ្នាំប្រឡងដែលគាំទ្រ': 'Supported exam years', 'ព័ត៌មានសំខាន់': 'Important information',
  'វេទិកានេះជាឧបករណ៍ស្វែងរកឯករាជ្យ និងមិនមែនជាគេហទំព័រផ្លូវការរបស់ក្រសួងអប់រំទេ។ សូមផ្ទៀងផ្ទាត់ព័ត៌មានសំខាន់ជាមួយប្រភពផ្លូវការ។': 'This is an independent search tool, not an official Ministry of Education website. Verify important information with an official source.',
  'ប្រើព័ត៌មានតែមួយ ឬបញ្ចូលតម្រងច្រើន ដើម្បីស្វែងរកលទ្ធផលបានត្រឹមត្រូវជាងមុន។': 'Use one detail or combine several filters for a more accurate search.',
  'ព័ត៌មានសម្រាប់ស្វែងរក': 'Search information', 'អ្នកមិនចាំបាច់បំពេញគ្រប់ប្រអប់ទាំងអស់ទេ។': 'You do not need to complete every field.',
  'ឈ្មោះពេញ': 'Full name', 'នាមត្រកូល': 'Family name', 'នាមខ្លួន': 'Given name', 'រាជធានី / ខេត្ត': 'Province / city', 'មណ្ឌលប្រឡង': 'Exam center',
  'គាំទ្រឈ្មោះជាភាសាខ្មែរ': 'Khmer names are supported', 'ប្រសិនបើមានក្នុងទិន្នន័យ': 'When available in the data',
  'សម្អាតតម្រង': 'Reset filters', 'ស្វែងរកលទ្ធផល': 'Search results', 'គន្លឹះស្វែងរក': 'Search tips',
  'បើរកមិនឃើញ សាកល្បងវាយតែនាមត្រកូល ឬផ្នែកខ្លីមួយនៃឈ្មោះ។ ថ្ងៃកំណើតគួរតែវាយតាមទម្រង់ដូចក្នុងបញ្ជីប្រឡង។': 'If no result appears, try only the family name or a shorter part of the name. Enter the birthday as printed in the result list.',
  'លទ្ធផលផ្គូផ្គងសម្រាប់': 'Matches for', 'លទ្ធផលសិស្សដែលមានក្នុងប្រព័ន្ធ។': 'Student results available in the system.',
  'ឈ្មោះ': 'Name', 'ថ្ងៃកំណើត': 'Date of birth', 'ឆ្នាំ': 'Year', 'និទ្ទេស': 'Grade', 'លទ្ធផល': 'Result', 'មើលលម្អិត →': 'View details →',
  'តម្រៀបតាម': 'Sort by', 'មើលលទ្ធផលលម្អិត': 'View full result', 'រកមិនឃើញលទ្ធផល': 'No results found',
  'សូមពិនិត្យអក្ខរាវិរុទ្ធ សាកល្បងផ្នែកខ្លីនៃឈ្មោះ ឬកាត់បន្ថយចំនួនតម្រង។': 'Check the spelling, try a shorter name, or use fewer filters.',
  'កែប្រែការស្វែងរក': 'Edit search', 'លទ្ធផលសិស្ស': 'Student result', 'ព័ត៌មានលម្អិតពីកំណត់ត្រា និងនិទ្ទេសតាមមុខវិជ្ជា។': 'Detailed record and subject grades.',
  'មិនមានទិន្នន័យ': 'Not available', 'និទ្ទេសតាមមុខវិជ្ជា': 'Subject grades', 'មុខវិជ្ជា': 'Subject', 'ព័ត៌មានប្រភព': 'Source information',
  'មើលសាលានេះ': 'View this school', 'រកឃើញព័ត៌មានខុស?': 'Found incorrect information?', 'រាយការណ៍កំហុស': 'Report an error',
  'ស្វែងរកសាលារៀន': 'School Search', 'ស្វែងរកសាលា ហើយមើលកំណត់ត្រាសិស្សដែលមានសម្រាប់សាលានោះ។': 'Find a school and browse its available student records.',
  'វាយឈ្មោះសាលា': 'Enter a school name', 'ស្វែងរកសាលា': 'Search schools', 'ជ្រើសរើសសាលាដើម្បីមើលបញ្ជីសិស្ស': 'Choose a school to view its students',
  'ទីតាំង:': 'Location:', 'មើលសាលា →': 'View school →', 'រកមិនឃើញសាលា': 'No schools found',
  'សាកល្បងផ្នែកខ្លីនៃឈ្មោះសាលា ឬសម្អាតតម្រង។': 'Try a shorter school name or clear the filters.',
  'ព័ត៌មានសាលា': 'School details', 'មើលកំណត់ត្រាសិស្សដែលមាន និងស្វែងរកក្នុងសាលានេះ។': 'Browse available student records and search within this school.',
  'សាលា': 'School', 'ស្វែងរកក្នុងសាលា': 'Search within this school', 'គ្រប់និទ្ទេស': 'All grades', 'សម្អាត': 'Reset', 'អនុវត្តតម្រង': 'Apply filters',
  'កំណត់ត្រាដែលផ្គូផ្គងតម្រង': 'Records matching the filters', 'មិនមានកំណត់ត្រាផ្គូផ្គង': 'No matching records',
  'សូមសម្អាតតម្រង ឬសាកល្បងឈ្មោះផ្សេង។': 'Clear the filters or try another name.',
  'អំពីវេទិកា': 'About the platform', 'ស្វែងយល់ពីគោលបំណង ប្រភពទិន្នន័យ និងរបៀបប្រើប្រាស់ប្រព័ន្ធ។': 'Learn about the purpose, data sources, and how to use the platform.',
  'ទំនាក់ទំនង និងជំនួយ': 'Contact and support', 'ផ្ញើ Email': 'Send email', 'ទាក់ទងតាម Telegram': 'Contact on Telegram',
  'ការបដិសេធ': 'Disclaimer', 'រកមិនឃើញទំព័រ': 'Page not found', 'ត្រឡប់ទៅទំព័រដើម': 'Return home',
  'មិនអាចផ្ទុកទិន្នន័យបាន': 'Unable to load data', 'ផ្ទុកឡើងវិញ': 'Reload', 'បើកម៉ឺនុយ': 'Open menu',
  'ស្វែងរក': 'Find', 'បានងាយ និងរហ័ស': 'quickly and easily',
  'វេទិកានេះធ្វើអ្វី?': 'What does this platform do?',
  'BacII Result Finder ជួយសិស្ស ឪពុកម្តាយ និងសាលារៀន ស្វែងរកកំណត់ត្រាលទ្ធផលប្រឡងបាក់ឌុបដែលបានបញ្ចូលក្នុងប្រព័ន្ធ។ អ្នកអាចស្វែងរកដោយឈ្មោះ ថ្ងៃកំណើត លេខបេក្ខជន ឬសាលារៀន។': 'BacII Result Finder helps students, parents, and schools search the BacII examination records available in the system. Search by name, birthday, candidate number, or school.',
  'របៀបស្វែងរក': 'How to search', 'ជ្រើសរើសការស្វែងរកសិស្ស ឬសាលា។': 'Choose student search or school search.', 'បញ្ចូលព័ត៌មានយ៉ាងហោចណាស់មួយ។': 'Enter at least one piece of information.',
  'ប្រៀបធៀបឈ្មោះ ថ្ងៃកំណើត និងសាលា ដើម្បីកំណត់អត្តសញ្ញាណកំណត់ត្រាត្រឹមត្រូវ។': 'Compare the name, birthday, and school to identify the correct record.',
  'បើក “មើលលម្អិត” ដើម្បីមើលនិទ្ទេសតាមមុខវិជ្ជា។': 'Open “View details” to see grades by subject.',
  'ប្រភព និងការបដិសេធ': 'Data source and disclaimer',
  'ទិន្នន័យត្រូវបានដកស្រង់ពីសន្លឹកលទ្ធផលប្រឡងដែលបានផ្សព្វផ្សាយ។ កំហុសអាចកើតឡើងក្នុងដំណើរការបញ្ចូល ឬអានអក្សរ។ វេទិកានេះមិនអះអាងថាជាសេវាផ្លូវការរបស់ក្រសួងទេ ហើយព័ត៌មានសំខាន់គួរតែផ្ទៀងផ្ទាត់ជាមួយប្រភពផ្លូវការ។': 'Data is transcribed from published examination sheets. Typing or text-recognition errors may occur. This platform is not an official Ministry service; verify important information with an official source.',
  'ប្រព័ន្ធបង្ហាញតែព័ត៌មានដែលចាំបាច់សម្រាប់បែងចែកលទ្ធផលសិស្ស។ មិនមានការចូលគណនី ឬការផ្ទៀងផ្ទាត់អត្តសញ្ញាណទេ ហើយយើងជៀសវាងការបង្ហាញព័ត៌មានផ្ទាល់ខ្លួនដែលមិនចាំបាច់។': 'The system displays only information needed to distinguish student results. No login or identity verification is required, and unnecessary personal information is avoided.',
  'ត្រូវការជំនួយ?': 'Need help?', 'ទាក់ទងមកយើង ប្រសិនបើអ្នករកមិនឃើញកំណត់ត្រា ឬមិនដឹងរបៀបស្វែងរក។': 'Contact us if you cannot find a record or need help searching.', 'ទាក់ទងមកយើង': 'Contact us',
  'ព័ត៌មានមិនត្រឹមត្រូវ?': 'Incorrect information?', 'ផ្ញើព័ត៌មានលម្អិតដើម្បីឱ្យយើងអាចពិនិត្យកំណត់ត្រាឡើងវិញ។': 'Send the details so we can review the record.',
  'ផ្ញើព័ត៌មានកំណត់ត្រាដែលមិនត្រឹមត្រូវ ដើម្បីឱ្យយើងពិនិត្យឡើងវិញ។': 'Send details about an incorrect record for review.',
  'ត្រូវការជំនួយក្នុងការស្វែងរក? អ្នកអាចទាក់ទងមកយើងតាម Telegram ឬ Email។': 'Need help searching? Contact us on Telegram or by email.',
  'សម្រាប់សំណួររហ័ស និងការរាយការណ៍ព័ត៌មាន។': 'For quick questions and information reports.', 'សម្រាប់ព័ត៌មានលម្អិត ឬភ្ជាប់ឯកសារយោង។': 'For detailed messages or reference attachments.',
  'ព័ត៌មានដែលគួរផ្ញើមក': 'Information to include', 'រាយការណ៍ព័ត៌មានមិនត្រឹមត្រូវ': 'Report incorrect information',
  'សូមបញ្ចូលឈ្មោះសិស្ស សាលា ឆ្នាំប្រឡង លេខទំព័រ (ប្រសិនបើមាន) និងពន្យល់ពីព័ត៌មានដែលត្រូវកែ។ កុំផ្ញើព័ត៌មានផ្ទាល់ខ្លួនដែលមិនចាំបាច់។': 'Include the student name, school, exam year, page number when available, and explain what should be corrected. Do not send unnecessary personal information.',
  'បើឈ្មោះ ថ្ងៃកំណើត សាលា ឬនិទ្ទេសមិនត្រឹមត្រូវ សូមផ្ញើតំណភ្ជាប់កំណត់ត្រា និងពន្យល់ពីចំណុចដែលត្រូវពិនិត្យ។': 'If a name, birthday, school, or grade is incorrect, send the record link and explain what should be reviewed.',
  'ចាប់ផ្តើមរាយការណ៍': 'Start a report', 'មើលការណែនាំរាយការណ៍': 'View reporting guidance',
  'របៀបដែលវេទិកាគោរពឯកជនភាពរបស់អ្នកប្រើប្រាស់។': 'How the platform respects user privacy.', 'ព័ត៌មានសំខាន់អំពីភាពត្រឹមត្រូវ និងស្ថានភាពរបស់វេទិកា។': 'Important information about accuracy and the status of this platform.',
  'ការស្វែងរករបស់អ្នក': 'Your searches', 'ព័ត៌មានសិស្ស': 'Student information', 'មិនមែនជាសេវាផ្លូវការ': 'Not an official service', 'ភាពត្រឹមត្រូវនៃទិន្នន័យ': 'Data accuracy',
  'វេទិកានេះមិនត្រូវការគណនី ការចូលប្រើ ឬការផ្ទៀងផ្ទាត់អត្តសញ្ញាណទេ។ ការស្វែងរកត្រូវបានអនុវត្តក្នុងកម្មវិធីរុករករបស់អ្នកដោយប្រើឯកសារទិន្នន័យដែលបានផ្សព្វផ្សាយជាមួយគេហទំព័រ។': 'This platform requires no account, login, or identity verification. Searches run in your browser using the data file published with the website.',
  'យើងព្យាយាមបង្ហាញតែព័ត៌មានដែលចាំបាច់សម្រាប់សម្គាល់កំណត់ត្រា និងលទ្ធផលប្រឡង។ សូមកុំប្រើព័ត៌មាននេះសម្រាប់ការរំខាន ការរើសអើង ឬគោលបំណងដែលប៉ះពាល់ដល់សិស្ស។': 'We aim to show only information needed to identify examination records. Do not use this information for harassment, discrimination, or any purpose that harms students.',
  'វេទិកានេះជាគម្រោងឯករាជ្យ និងមិនត្រូវបានចាត់ទុកថាជាគេហទំព័រផ្លូវការរបស់ក្រសួងអប់រំ យុវជន និងកីឡា លុះត្រាតែមានការអនុញ្ញាតជាក់លាក់ជាលាយលក្ខណ៍អក្សរ។': 'This is an independent project and is not an official Ministry of Education, Youth and Sport website unless explicitly authorized in writing.',
  'ការដកស្រង់ទិន្នន័យអាចមានកំហុសអក្ខរាវិរុទ្ធ ឬការផ្គូផ្គង។ សូមប្រើប្រភពផ្លូវការជាចុងក្រោយសម្រាប់ការបញ្ជាក់លទ្ធផល។ បើអ្នករកឃើញកំហុស សូមរាយការណ៍មកយើង។': 'Transcribed data may contain spelling or matching errors. Use an official source for final confirmation and report any errors you find.',
  'តំណភ្ជាប់នេះប្រហែលជាមិនត្រឹមត្រូវ ឬកំណត់ត្រាមិនមានទៀតទេ។': 'This link may be incorrect or the record is no longer available.', 'សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណិត រួចសាកល្បងម្តងទៀត។': 'Check your internet connection and try again.'
  , 'សម្រាប់គណៈគ្រប់គ្រងសាលា': 'For school management teams'
  , 'ប្រសិនបើក្រុមគ្រប់គ្រងសាលាចង់ស្វែងរកឈ្មោះសិស្សបានងាយស្រួល សូមទាក់ទងមកខ្ញុំ។': 'If your school management team wants an easier way to search student names, please contact me.'
  , 'បើកទំព័រស្វែងរកសិស្ស។': 'Open the student search page.'
}));

const arabicToKhmer = { 0: '០', 1: '១', 2: '២', 3: '៣', 4: '៤', 5: '៥', 6: '៦', 7: '៧', 8: '៨', 9: '៩' };
const khmerToArabic = Object.fromEntries(Object.entries(arabicToKhmer).map(([key, value]) => [value, key]));
const subjectLabels = {
  Khmer: ['ភាសាខ្មែរ', 'Khmer'],
  Math: ['គណិតវិទ្យា', 'Mathematics'],
  Physic: ['រូបវិទ្យា', 'Physics'],
  Chemistry: ['គីមីវិទ្យា', 'Chemistry'],
  Bio: ['ជីវវិទ្យា', 'Biology'],
  History: ['ប្រវត្តិវិទ្យា', 'History'],
  Language: ['ភាសាបរទេស', 'Foreign Language'],
};

let students = [];
let loadError = false;
let homeSearchType = 'name';
let currentResults = [];
let currentPage = 1;
const pageSize = 8;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function normalize(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[០-៩]/g, digit => khmerToArabic[digit])
    .replace(/[.,/\\|_\-–—()!+]/g, ' ')
    .replace(/\s+/g, ' ');
}

function khmerNumber(value) {
  const output = String(value ?? '');
  return language === 'km' ? output.replace(/[0-9]/g, digit => arabicToKhmer[digit]) : output;
}

function translateText(value) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  let translated = english.get(trimmed);
  if (!translated) {
    translated = trimmed
      .replace(/^រកឃើញ (.+) លទ្ធផល$/, 'Found $1 results')
      .replace(/^បង្ហាញ (.+)–(.+) នៃ (.+)$/, 'Showing $1–$2 of $3')
      .replace(/^រកឃើញ (.+) សាលា$/, 'Found $1 schools')
      .replace(/^សាលារៀន (.+)$/, '$1 schools')
      .replace(/^សិស្ស (.+) នាក់$/, '$1 students')
      .replace(/^(.+) កំណត់ត្រា$/, '$1 records')
      .replace(/^ឆ្នាំ (.+)$/, 'Year $1')
      .replace(/^ទំព័រ (.+)$/, 'Page $1');
  }
  if (translated === trimmed) return value;
  const leading = value.match(/^\s*/)?.[0] || '';
  const trailing = value.match(/\s*$/)?.[0] || '';
  return `${leading}${translated}${trailing}`;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-language]').forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return;
    if (node.__khmerText === undefined) node.__khmerText = node.nodeValue;
    node.nodeValue = language === 'en' ? translateText(node.__khmerText) : node.__khmerText;
  });
  document.querySelectorAll('[placeholder], [aria-label]').forEach(element => {
    ['placeholder', 'aria-label'].forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      const key = `khmer${attribute.replace('-', '')}`;
      if (element.dataset[key] === undefined) element.dataset[key] = element.getAttribute(attribute);
      element.setAttribute(attribute, language === 'en' ? translateText(element.dataset[key]) : element.dataset[key]);
    });
  });
}

function yearOptions(selected = '', includeAll = true) {
  const all = includeAll ? `<option value="">${language === 'en' ? 'All years' : 'គ្រប់ឆ្នាំ'}</option>` : '';
  return `${all}${EXAM_YEARS.map(year => `<option value="${year}" ${selected === year ? 'selected' : ''}>${khmerNumber(year)}</option>`).join('')}`;
}

function getValue(student, ...keys) {
  const key = keys.find(candidate => student[candidate] !== undefined && student[candidate] !== null && student[candidate] !== '');
  return key ? student[key] : '';
}

function studentId(student) {
  return getValue(student, 'Candidate ID', 'Candidate Number', 'Student ID', 'ID');
}

function studentYear(student) {
  return getValue(student, 'Year', 'Exam Year') || '2025';
}

function studentProvince(student) {
  return getValue(student, 'Province', 'City');
}

function studentCenter(student) {
  return getValue(student, 'Exam Center', 'Center');
}

function nameParts(student) {
  const parts = String(student.Name || '').trim().split(/\s+/);
  return { family: parts[0] || '', given: parts.slice(1).join(' ') };
}

function routeInfo() {
  const raw = location.hash.replace(/^#/, '') || 'home';
  const [pathPart, queryPart = ''] = raw.split('?');
  return { path: pathPart || 'home', params: new URLSearchParams(queryPart) };
}

function routeTo(path, params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (String(value ?? '').trim()) query.set(key, value);
  });
  location.hash = `${path}${query.toString() ? `?${query}` : ''}`;
}

function safeDecode(value) {
  try { return decodeURIComponent(value); } catch { return value; }
}

function setActiveNavigation(path) {
  const root = path.split('/')[0];
  const section = root === 'student' || root === 'results' ? 'students' : root === 'school' ? 'schools' : root;
  document.querySelectorAll('[data-route-link]').forEach(link => link.classList.toggle('active', link.dataset.routeLink === section));
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

function pageHero(title, description, trail = []) {
  const breadcrumbs = [['#home', 'ទំព័រដើម'], ...trail];
  return `
    <section class="page-hero">
      <div class="shell page-title">
        <div class="breadcrumbs">${breadcrumbs.map(([href, label], index) => index === breadcrumbs.length - 1 ? `<span>${escapeHtml(label)}</span>` : `<a href="${href}">${escapeHtml(label)}</a>`).join('')}</div>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    </section>`;
}

function stateCard(type, title, message, action = '') {
  const symbol = type === 'error' ? '!' : type === 'empty' ? '0' : '…';
  return `<div class="state-card ${type === 'error' ? 'state-error' : ''}"><span class="state-symbol">${symbol}</span><h2>${title}</h2><p>${message}</p>${action}</div>`;
}

function renderHome() {
  homeSearchType = 'name';
  const schoolCount = new Set(students.map(student => student['School Name']).filter(Boolean)).size;
  app.innerHTML = `
    <section class="hero">
      <div class="shell hero-inner">
        <p class="eyebrow">ទិន្នន័យលទ្ធផលប្រឡងឆ្នាំ ២០២០–២០២៥</p>
        <h1>ស្វែងរក<span>លទ្ធផលបាក់ឌុប</span><br />បានងាយ និងរហ័ស</h1>
        <p class="hero-lead">ស្វែងរកតាមឈ្មោះ ថ្ងៃខែឆ្នាំកំណើត លេខបេក្ខជន ឬសាលា។ គាំទ្រការស្វែងរកជាភាសាខ្មែរ និងប្រើបានល្អលើទូរស័ព្ទ។</p>
        <form class="home-search" id="home-search-form">
          <div class="search-tabs" role="tablist" aria-label="ប្រភេទស្វែងរក">
            <button class="search-tab active" type="button" data-search-type="name">ឈ្មោះសិស្ស</button>
            <button class="search-tab" type="button" data-search-type="id">លេខបេក្ខជន</button>
            <button class="search-tab" type="button" data-search-type="birthday">ថ្ងៃខែឆ្នាំកំណើត</button>
            <button class="search-tab" type="button" data-search-type="school">ស្វែងរកសាលា</button>
          </div>
          <div class="home-search-body">
            <div id="home-standard-search">
              <label for="home-query" id="home-search-label">ឈ្មោះពេញ ឬផ្នែកណាមួយនៃឈ្មោះ</label>
              <div class="home-search-row">
                <div class="home-year"><label class="sr-only" for="home-year">ឆ្នាំប្រឡង</label><select id="home-year" name="year" aria-label="ឆ្នាំប្រឡង">${yearOptions('2025')}</select></div>
                <div class="input-with-icon"><span class="input-symbol" aria-hidden="true">⌕</span><input id="home-query" name="query" autocomplete="off" enterkeyhint="search" placeholder="ឧ. ឈុំ សុខរិទ្ធ" required /></div>
                <button class="btn btn-primary" type="submit">ស្វែងរកឥឡូវ</button>
              </div>
              <p class="search-hint" id="home-search-hint">អាចវាយនាមត្រកូល នាមខ្លួន ឬឈ្មោះពេញ។</p>
              <a class="advanced-link" href="#students">ស្វែងរកកម្រិតខ្ពស់</a>
            </div>
            <div class="school-management-panel" id="school-management-panel" hidden>
              <span class="quick-icon">សាលា</span>
              <div><h2>សម្រាប់គណៈគ្រប់គ្រងសាលា</h2><p>ប្រសិនបើក្រុមគ្រប់គ្រងសាលាចង់ស្វែងរកឈ្មោះសិស្សបានងាយស្រួល សូមទាក់ទងមកខ្ញុំ។</p><div class="school-contact-actions"><a href="https://t.me/Iamnotaproplayer" target="_blank" rel="noreferrer">Telegram</a><a href="mailto:investingseth@gmail.com">Email</a></div></div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section-heading"><p class="section-kicker">ស្វែងរករហ័ស</p><h2>ជ្រើសរើសវិធីដែលងាយសម្រាប់អ្នក</h2><p>ចាប់ផ្តើមដោយព័ត៌មានតែមួយ ឬប្រើតម្រងច្រើនដើម្បីទទួលបានលទ្ធផលកាន់តែច្បាស់។</p></div>
        <div class="quick-grid">
          <a class="quick-card" href="#students"><span class="quick-icon">នាម</span><h3>ស្វែងរកសិស្ស</h3><p>ប្រើឈ្មោះ ថ្ងៃកំណើត លេខបេក្ខជន ឬបញ្ចូលតម្រងរួមគ្នា។</p><span class="card-arrow">→</span></a>
          <a class="quick-card" href="#students"><span class="quick-icon">ID</span><h3>ស្វែងរកលេខបេក្ខជន</h3><p>ស្វែងរកកំណត់ត្រាជាក់លាក់ដោយលេខសម្គាល់បេក្ខជន ប្រសិនបើមានក្នុងទិន្នន័យ។</p><span class="card-arrow">→</span></a>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="shell">
        <div class="section-heading"><p class="section-kicker">របៀបប្រើប្រាស់</p><h2>ត្រឹមតែ ៣ ជំហាន</h2></div>
        <div class="steps"><div class="step"><h3>បញ្ចូលព័ត៌មាន</h3><p>វាយឈ្មោះ ថ្ងៃកំណើត លេខបេក្ខជន ឬសាលា។</p></div><div class="step"><h3>ស្វែងរកកំណត់ត្រា</h3><p>ប្រព័ន្ធនឹងផ្គូផ្គងព័ត៌មានជាមួយទិន្នន័យដែលមាន។</p></div><div class="step"><h3>មើលលទ្ធផល</h3><p>បើកព័ត៌មានលម្អិត និងមើលនិទ្ទេសតាមមុខវិជ្ជា។</p></div></div>
        <div class="stats-grid"><div class="stat"><strong>${khmerNumber(students.length)}</strong><span>កំណត់ត្រាសិស្ស</span></div><div class="stat"><strong>${khmerNumber(schoolCount)}</strong><span>សាលារៀន</span></div><div class="stat"><strong>${language === 'km' ? '២០២០–២០២៥' : '2020–2025'}</strong><span>ឆ្នាំប្រឡងដែលគាំទ្រ</span></div></div>
      </div>
    </section>
    <section class="section"><div class="shell"><div class="notice"><span class="notice-icon">i</span><div><h2>ព័ត៌មានសំខាន់</h2><p>វេទិកានេះជាឧបករណ៍ស្វែងរកឯករាជ្យ និងមិនមែនជាគេហទំព័រផ្លូវការរបស់ក្រសួងអប់រំទេ។ សូមផ្ទៀងផ្ទាត់ព័ត៌មានសំខាន់ជាមួយប្រភពផ្លូវការ។</p></div></div></div></section>`;
  bindHomeSearch();
}

function bindHomeSearch() {
  const config = {
    name: ['ឈ្មោះពេញ ឬផ្នែកណាមួយនៃឈ្មោះ', 'ឧ. ឈុំ សុខរិទ្ធ', 'អាចវាយនាមត្រកូល នាមខ្លួន ឬឈ្មោះពេញ។'],
    id: ['លេខបេក្ខជន / លេខសម្គាល់', 'ឧ. 123456', 'បញ្ចូលលេខជាខ្មែរ ឬអង់គ្លេស។'],
    birthday: ['ថ្ងៃខែឆ្នាំកំណើត', 'ឧ. ២១ កញ្ញា ០៧', 'វាយតាមទម្រង់ដែលបានបោះពុម្ពក្នុងបញ្ជីលទ្ធផល។'],
    school: ['ឈ្មោះសាលារៀន', 'ឧ. វិ.ទួលទំពូង', 'វាយឈ្មោះពេញ ឬផ្នែកណាមួយនៃឈ្មោះសាលា។'],
  };
  document.querySelectorAll('[data-search-type]').forEach(button => button.addEventListener('click', () => {
    homeSearchType = button.dataset.searchType;
    document.querySelectorAll('[data-search-type]').forEach(tab => tab.classList.toggle('active', tab === button));
    const standardSearch = document.querySelector('#home-standard-search');
    const schoolPanel = document.querySelector('#school-management-panel');
    const schoolMode = homeSearchType === 'school';
    standardSearch.hidden = schoolMode;
    schoolPanel.hidden = !schoolMode;
    if (schoolMode) {
      applyLanguage();
      return;
    }
    const input = document.querySelector('#home-query');
    document.querySelector('#home-search-label').textContent = config[homeSearchType][0];
    input.placeholder = config[homeSearchType][1];
    delete input.dataset.khmerplaceholder;
    input.value = '';
    document.querySelector('#home-search-hint').textContent = config[homeSearchType][2];
    applyLanguage();
    input.focus();
  }));
  document.querySelector('#home-search-form').addEventListener('submit', event => {
    event.preventDefault();
    if (homeSearchType === 'school') return;
    const query = document.querySelector('#home-query').value.trim();
    const year = document.querySelector('#home-year').value;
    if (!query) return;
    routeTo('results', { [homeSearchType === 'name' ? 'q' : homeSearchType]: query, year });
  });
}

function renderStudentSearch() {
  app.innerHTML = `${pageHero('ស្វែងរកសិស្ស', 'ប្រើព័ត៌មានតែមួយ ឬបញ្ចូលតម្រងច្រើន ដើម្បីស្វែងរកលទ្ធផលបានត្រឹមត្រូវជាងមុន។', [['#students', 'ស្វែងរកសិស្ស']])}
    <section class="page-content"><div class="shell">
      <form class="search-panel" id="advanced-form">
        <div class="search-panel-header"><div><h2>ព័ត៌មានសម្រាប់ស្វែងរក</h2><p>អ្នកមិនចាំបាច់បំពេញគ្រប់ប្រអប់ទាំងអស់ទេ។</p></div></div>
        <div class="form-grid">
          <div class="form-field form-span-2"><label for="q">ឈ្មោះពេញ</label><input id="q" name="q" placeholder="ឧ. ឈុំ សុខរិទ្ធ" autocomplete="name" /><small>គាំទ្រឈ្មោះជាភាសាខ្មែរ</small></div>
          <div class="form-field"><label for="candidate">លេខបេក្ខជន</label><input id="candidate" name="id" placeholder="លេខបេក្ខជន" inputmode="numeric" /></div>
          <div class="form-field"><label for="family">នាមត្រកូល</label><input id="family" name="family" placeholder="ឧ. ឈុំ" /></div>
          <div class="form-field"><label for="given">នាមខ្លួន</label><input id="given" name="given" placeholder="ឧ. សុខរិទ្ធ" /></div>
          <div class="form-field"><label for="birthday">ថ្ងៃខែឆ្នាំកំណើត</label><input id="birthday" name="birthday" placeholder="ឧ. ២១ កញ្ញា ០៧" /></div>
          <div class="form-field"><label for="school">សាលារៀន</label><input id="school" name="school" placeholder="ឈ្មោះសាលា" /></div>
          <div class="form-field"><label for="province">រាជធានី / ខេត្ត</label><input id="province" name="province" placeholder="ប្រសិនបើមានក្នុងទិន្នន័យ" /></div>
          <div class="form-field"><label for="center">មណ្ឌលប្រឡង</label><input id="center" name="center" placeholder="ប្រសិនបើមានក្នុងទិន្នន័យ" /></div>
          <div class="form-field"><label for="year">ឆ្នាំប្រឡង</label><select id="year" name="year">${yearOptions()}</select></div>
        </div>
        <div class="form-actions"><button class="btn btn-secondary" id="reset-filters" type="reset">សម្អាតតម្រង</button><button class="btn btn-primary" type="submit">ស្វែងរកលទ្ធផល</button></div>
      </form>
      <div class="notice" style="margin-top:22px"><span class="notice-icon">?</span><div><h3>គន្លឹះស្វែងរក</h3><p>បើរកមិនឃើញ សាកល្បងវាយតែនាមត្រកូល ឬផ្នែកខ្លីមួយនៃឈ្មោះ។ ថ្ងៃកំណើតគួរតែវាយតាមទម្រង់ដូចក្នុងបញ្ជីប្រឡង។</p></div></div>
    </div></section>`;
  const form = document.querySelector('#advanced-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const params = Object.fromEntries(new FormData(form).entries());
    if (!Object.values(params).some(value => String(value).trim())) {
      form.querySelector('#q').focus();
      return;
    }
    routeTo('results', params);
  });
}

function filterStudents(params) {
  return students.filter(student => {
    const parts = nameParts(student);
    const checks = [
      ['q', student.Name, false],
      ['family', parts.family, false],
      ['given', parts.given, false],
      ['id', studentId(student), true],
      ['birthday', student.Birthday, true],
      ['school', student['School Name'], false],
      ['province', studentProvince(student), false],
      ['center', studentCenter(student), false],
      ['year', studentYear(student), true],
    ];
    return checks.every(([key, value, exact]) => {
      const wanted = normalize(params.get(key));
      if (!wanted) return true;
      const actual = normalize(value);
      return exact ? actual === wanted : actual.includes(wanted);
    });
  });
}

function renderResults(params) {
  currentResults = filterStudents(params);
  currentPage = Math.max(1, Number(params.get('page')) || 1);
  const terms = [...params.entries()].filter(([key, value]) => key !== 'page' && key !== 'sort' && value).map(([, value]) => value);
  app.innerHTML = `${pageHero('លទ្ធផលស្វែងរក', terms.length ? `លទ្ធផលផ្គូផ្គងសម្រាប់ “${escapeHtml(terms.join(' · '))}”` : 'លទ្ធផលសិស្សដែលមានក្នុងប្រព័ន្ធ។', [['#students', 'ស្វែងរកសិស្ស'], ['#results', 'លទ្ធផល']])}
    <section class="page-content"><div class="shell"><div id="results-area"></div></div></section>`;
  drawResults(params);
}

function sortStudents(list, sort) {
  return [...list].sort((a, b) => {
    if (sort === 'grade') return String(a.Grade).localeCompare(String(b.Grade));
    if (sort === 'school') return String(a['School Name']).localeCompare(String(b['School Name']), 'km');
    return String(a.Name).localeCompare(String(b.Name), 'km');
  });
}

function resultRow(student) {
  const index = students.indexOf(student);
  const candidate = studentId(student) || `ទំព័រ ${khmerNumber(student['Page Number'] || '—')}`;
  return `<tr><td class="student-cell"><strong>${escapeHtml(student.Name)}</strong><span>${escapeHtml(candidate)}</span></td><td>${escapeHtml(student.Birthday || 'មិនមានទិន្នន័យ')}</td><td>${escapeHtml(student['School Name'] || 'មិនមានទិន្នន័យ')}</td><td><span class="year-badge">${escapeHtml(khmerNumber(studentYear(student)))}</span></td><td><span class="grade-badge">${escapeHtml(student.Grade || '—')}</span></td><td><span class="status-badge ${normalize(student['Total Result']).includes('ធ្លាក់') ? 'failed' : ''}">${escapeHtml(student['Total Result'] || '—')}</span></td><td><a class="table-link" href="#student/${index}">មើលលម្អិត →</a></td></tr>`;
}

function resultCard(student) {
  const index = students.indexOf(student);
  return `<article class="student-card"><div class="student-card-head"><span class="grade-badge">${escapeHtml(student.Grade || '—')}</span><div><h3>${escapeHtml(student.Name)}</h3><p class="school-name">${escapeHtml(student['School Name'] || 'មិនមានទិន្នន័យ')}</p></div><span class="status-badge ${normalize(student['Total Result']).includes('ធ្លាក់') ? 'failed' : ''}">${escapeHtml(student['Total Result'] || '—')}</span></div><div class="student-card-meta"><div><span class="meta-label">ថ្ងៃកំណើត</span><span class="meta-value">${escapeHtml(student.Birthday || 'មិនមានទិន្នន័យ')}</span></div><div><span class="meta-label">ឆ្នាំប្រឡង</span><span class="meta-value">${escapeHtml(khmerNumber(studentYear(student)))}</span></div></div><a class="btn btn-light" href="#student/${index}">មើលលទ្ធផលលម្អិត</a></article>`;
}

function drawResults(params) {
  const area = document.querySelector('#results-area');
  if (!currentResults.length) {
    area.innerHTML = stateCard('empty', 'រកមិនឃើញលទ្ធផល', 'សូមពិនិត្យអក្ខរាវិរុទ្ធ សាកល្បងផ្នែកខ្លីនៃឈ្មោះ ឬកាត់បន្ថយចំនួនតម្រង។', '<a class="btn btn-primary" href="#students">កែប្រែការស្វែងរក</a>');
    return;
  }
  const sort = params.get('sort') || 'name';
  const sorted = sortStudents(currentResults, sort);
  const pages = Math.ceil(sorted.length / pageSize);
  currentPage = Math.min(currentPage, pages);
  const visible = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageButtons = Array.from({ length: pages }, (_, index) => index + 1).map(page => `<button type="button" class="${page === currentPage ? 'active' : ''}" data-page="${page}" aria-label="Page ${page}">${khmerNumber(page)}</button>`).join('');
  area.innerHTML = `
    <div class="results-toolbar"><div><h2>រកឃើញ ${khmerNumber(currentResults.length)} លទ្ធផល</h2><p>បង្ហាញ ${khmerNumber((currentPage - 1) * pageSize + 1)}–${khmerNumber(Math.min(currentPage * pageSize, sorted.length))} នៃ ${khmerNumber(sorted.length)}</p></div><div class="sort-control"><label for="sort-results">តម្រៀបតាម</label><select id="sort-results"><option value="name" ${sort === 'name' ? 'selected' : ''}>ឈ្មោះ</option><option value="grade" ${sort === 'grade' ? 'selected' : ''}>និទ្ទេស</option><option value="school" ${sort === 'school' ? 'selected' : ''}>សាលា</option></select></div></div>
    <div class="table-wrap"><table class="results-table"><thead><tr><th>សិស្ស</th><th>ថ្ងៃកំណើត</th><th>សាលា</th><th>ឆ្នាំ</th><th>និទ្ទេស</th><th>លទ្ធផល</th><th></th></tr></thead><tbody>${visible.map(resultRow).join('')}</tbody></table><div class="result-cards-mobile">${visible.map(resultCard).join('')}</div></div>
    ${pages > 1 ? `<nav class="pagination" aria-label="Results pages"><button type="button" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>‹</button>${pageButtons}<button type="button" data-page="${currentPage + 1}" ${currentPage === pages ? 'disabled' : ''}>›</button></nav>` : ''}`;
  document.querySelector('#sort-results').addEventListener('change', event => { params.set('sort', event.target.value); params.delete('page'); routeTo('results', Object.fromEntries(params)); });
  document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => { params.set('page', button.dataset.page); routeTo('results', Object.fromEntries(params)); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
}

function renderStudentDetail(index) {
  const student = students[Number(index)];
  if (!student) { renderNotFound(); return; }
  const scores = Object.entries(subjectLabels).map(([key, [khmer, english]]) => `<tr><td><strong>${khmer}</strong><br><span class="meta-label">${english}</span></td><td><span class="grade-badge">${escapeHtml(student.Scores?.[key] || '—')}</span></td></tr>`).join('');
  app.innerHTML = `${pageHero('លទ្ធផលសិស្ស', 'ព័ត៌មានលម្អិតពីកំណត់ត្រា និងនិទ្ទេសតាមមុខវិជ្ជា។', [['#students', 'ស្វែងរកសិស្ស'], ['#student', escapeHtml(student.Name)]])}
    <section class="page-content"><div class="shell detail-grid">
      <article class="detail-card"><div class="result-identity"><div class="result-grade">${escapeHtml(student.Grade || '—')}</div><div><div class="detail-status-row"><span class="status-badge ${normalize(student['Total Result']).includes('ធ្លាក់') ? 'failed' : ''}">${escapeHtml(student['Total Result'] || 'មិនមានទិន្នន័យ')}</span><span class="year-badge">ឆ្នាំ ${escapeHtml(khmerNumber(studentYear(student)))}</span></div><h1>${escapeHtml(student.Name)}</h1><p>${escapeHtml(student['School Name'] || 'មិនមានទិន្នន័យសាលា')}</p></div></div>
        <div class="detail-fields"><div class="detail-field"><span class="meta-label">លេខបេក្ខជន</span><span class="meta-value">${escapeHtml(studentId(student) || 'មិនមានទិន្នន័យ')}</span></div><div class="detail-field"><span class="meta-label">ថ្ងៃខែឆ្នាំកំណើត</span><span class="meta-value">${escapeHtml(student.Birthday || 'មិនមានទិន្នន័យ')}</span></div><div class="detail-field"><span class="meta-label">រាជធានី / ខេត្ត</span><span class="meta-value">${escapeHtml(studentProvince(student) || 'មិនមានទិន្នន័យ')}</span></div><div class="detail-field"><span class="meta-label">មណ្ឌលប្រឡង</span><span class="meta-value">${escapeHtml(studentCenter(student) || 'មិនមានទិន្នន័យ')}</span></div></div>
        <div class="score-section"><h2>និទ្ទេសតាមមុខវិជ្ជា</h2><table class="score-table"><thead><tr><th>មុខវិជ្ជា</th><th>និទ្ទេស</th></tr></thead><tbody>${scores}</tbody></table></div>
      </article>
      <aside class="side-card-wrap"><div class="side-card"><h2>ព័ត៌មានប្រភព</h2><p>កំណត់ត្រានេះត្រូវបានដកស្រង់ពីទំព័រ ${escapeHtml(khmerNumber(student['Page Number'] || '—'))} នៃឯកសារលទ្ធផល។ សូមផ្ទៀងផ្ទាត់ជាមួយប្រភពផ្លូវការ។</p></div><div class="side-card"><h2>រកឃើញព័ត៌មានខុស?</h2><p>សូមផ្ញើឈ្មោះ និងព័ត៌មានដែលត្រូវកែ ដើម្បីឱ្យយើងពិនិត្យឡើងវិញ។</p><a class="btn btn-danger-light" href="mailto:investingseth@gmail.com?subject=Report incorrect BacII information">រាយការណ៍ព័ត៌មានខុស</a></div></aside>
    </div></section>`;
}

function renderAbout() {
  app.innerHTML = `${pageHero('អំពីវេទិកា', 'ស្វែងយល់ពីគោលបំណង ប្រភពទិន្នន័យ និងរបៀបប្រើប្រាស់ប្រព័ន្ធ។', [['#about', 'អំពីយើង']])}<section class="page-content"><div class="shell content-layout"><article class="prose-card"><h2>វេទិកានេះធ្វើអ្វី?</h2><p>BacII Result Finder ជួយសិស្ស ឪពុកម្តាយ និងសាលារៀន ស្វែងរកកំណត់ត្រាលទ្ធផលប្រឡងបាក់ឌុបដែលបានបញ្ចូលក្នុងប្រព័ន្ធ។ អ្នកអាចស្វែងរកដោយឈ្មោះ ថ្ងៃកំណើត លេខបេក្ខជន ឬសាលារៀន។</p><h2>របៀបស្វែងរក</h2><ol><li>បើកទំព័រស្វែងរកសិស្ស។</li><li>បញ្ចូលព័ត៌មានយ៉ាងហោចណាស់មួយ។</li><li>ប្រៀបធៀបឈ្មោះ ថ្ងៃកំណើត និងសាលា ដើម្បីកំណត់អត្តសញ្ញាណកំណត់ត្រាត្រឹមត្រូវ។</li><li>បើក “មើលលម្អិត” ដើម្បីមើលនិទ្ទេសតាមមុខវិជ្ជា។</li></ol><h2>ប្រភព និងការបដិសេធ</h2><p>ទិន្នន័យត្រូវបានដកស្រង់ពីសន្លឹកលទ្ធផលប្រឡងដែលបានផ្សព្វផ្សាយ។ កំហុសអាចកើតឡើងក្នុងដំណើរការបញ្ចូល ឬអានអក្សរ។ វេទិកានេះមិនអះអាងថាជាសេវាផ្លូវការរបស់ក្រសួងទេ ហើយព័ត៌មានសំខាន់គួរតែផ្ទៀងផ្ទាត់ជាមួយប្រភពផ្លូវការ។</p><h2>ឯកជនភាព</h2><p>ប្រព័ន្ធបង្ហាញតែព័ត៌មានដែលចាំបាច់សម្រាប់បែងចែកលទ្ធផលសិស្ស។ មិនមានការចូលគណនី ឬការផ្ទៀងផ្ទាត់អត្តសញ្ញាណទេ ហើយយើងជៀសវាងការបង្ហាញព័ត៌មានផ្ទាល់ខ្លួនដែលមិនចាំបាច់។</p></article><aside class="side-card-wrap"><div class="side-card"><h2>ត្រូវការជំនួយ?</h2><p>ទាក់ទងមកយើង ប្រសិនបើអ្នករកមិនឃើញកំណត់ត្រា ឬមិនដឹងរបៀបស្វែងរក។</p><a class="btn btn-primary" href="https://t.me/Iamnotaproplayer" target="_blank" rel="noreferrer">ទាក់ទងតាម Telegram</a></div><div class="side-card"><h2>ព័ត៌មានមិនត្រឹមត្រូវ?</h2><p>ផ្ញើព័ត៌មានលម្អិតដើម្បីឱ្យយើងអាចពិនិត្យកំណត់ត្រាឡើងវិញ។</p><a class="btn btn-secondary" href="mailto:investingseth@gmail.com?subject=Report incorrect BacII information">រាយការណ៍កំហុស</a></div></aside></div></section>`;
}

function renderPolicy(type) {
  const privacy = type === 'privacy';
  app.innerHTML = `${pageHero(privacy ? 'ឯកជនភាព' : 'ការបដិសេធ', privacy ? 'របៀបដែលវេទិកាគោរពឯកជនភាពរបស់អ្នកប្រើប្រាស់។' : 'ព័ត៌មានសំខាន់អំពីភាពត្រឹមត្រូវ និងស្ថានភាពរបស់វេទិកា។', [[`#${type}`, privacy ? 'ឯកជនភាព' : 'ការបដិសេធ']])}<section class="page-content"><div class="shell"><article class="prose-card">${privacy ? '<h2>ការស្វែងរករបស់អ្នក</h2><p>វេទិកានេះមិនត្រូវការគណនី ការចូលប្រើ ឬការផ្ទៀងផ្ទាត់អត្តសញ្ញាណទេ។ ការស្វែងរកត្រូវបានអនុវត្តក្នុងកម្មវិធីរុករករបស់អ្នកដោយប្រើឯកសារទិន្នន័យដែលបានផ្សព្វផ្សាយជាមួយគេហទំព័រ។</p><h2>ព័ត៌មានសិស្ស</h2><p>យើងព្យាយាមបង្ហាញតែព័ត៌មានដែលចាំបាច់សម្រាប់សម្គាល់កំណត់ត្រា និងលទ្ធផលប្រឡង។ សូមកុំប្រើព័ត៌មាននេះសម្រាប់ការរំខាន ការរើសអើង ឬគោលបំណងដែលប៉ះពាល់ដល់សិស្ស។</p>' : '<h2>មិនមែនជាសេវាផ្លូវការ</h2><p>វេទិកានេះជាគម្រោងឯករាជ្យ និងមិនត្រូវបានចាត់ទុកថាជាគេហទំព័រផ្លូវការរបស់ក្រសួងអប់រំ យុវជន និងកីឡា លុះត្រាតែមានការអនុញ្ញាតជាក់លាក់ជាលាយលក្ខណ៍អក្សរ។</p><h2>ភាពត្រឹមត្រូវនៃទិន្នន័យ</h2><p>ការដកស្រង់ទិន្នន័យអាចមានកំហុសអក្ខរាវិរុទ្ធ ឬការផ្គូផ្គង។ សូមប្រើប្រភពផ្លូវការជាចុងក្រោយសម្រាប់ការបញ្ជាក់លទ្ធផល។ បើអ្នករកឃើញកំហុស សូមរាយការណ៍មកយើង។</p>'}</article></div></section>`;
}

function renderNotFound() {
  app.innerHTML = `<section class="page-content"><div class="shell">${stateCard('error', 'រកមិនឃើញទំព័រ', 'តំណភ្ជាប់នេះប្រហែលជាមិនត្រឹមត្រូវ ឬកំណត់ត្រាមិនមានទៀតទេ។', '<a class="btn btn-primary" href="#home">ត្រឡប់ទៅទំព័រដើម</a>')}</div></section>`;
}

function renderLoadError() {
  app.innerHTML = `<section class="page-content"><div class="shell">${stateCard('error', 'មិនអាចផ្ទុកទិន្នន័យបាន', 'សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណិត រួចសាកល្បងម្តងទៀត។', '<button class="btn btn-primary" type="button" onclick="location.reload()">ផ្ទុកឡើងវិញ</button>')}</div></section>`;
}

function renderRoute() {
  const { path, params } = routeInfo();
  setActiveNavigation(path);
  if (loadError) { renderLoadError(); applyLanguage(); return; }
  const [root, rest] = path.split('/');
  if (root === 'home') renderHome();
  else if (root === 'students') renderStudentSearch();
  else if (root === 'results') renderResults(params);
  else if (root === 'student') renderStudentDetail(rest);
  else if (root === 'about') renderAbout();
  else if (root === 'privacy' || root === 'disclaimer') renderPolicy(root);
  else renderNotFound();
  applyLanguage();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
  language = button.dataset.language;
  localStorage.setItem('bacii-language', language);
  renderRoute();
}));

window.addEventListener('hashchange', renderRoute);
applyLanguage();

fetch('./results.json')
  .then(response => { if (!response.ok) throw new Error('Could not load results'); return response.json(); })
  .then(data => { students = Array.isArray(data) ? data : []; renderRoute(); })
  .catch(() => { loadError = true; renderRoute(); });

window.addEventListener('load', () => {
  const telegram = window.Telegram?.WebApp;
  if (!telegram) return;
  telegram.ready();
  telegram.expand();
  telegram.setHeaderColor?.('#ffffff');
  telegram.setBackgroundColor?.('#f5f8fb');
});
