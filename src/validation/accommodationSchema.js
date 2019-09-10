import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';
import messages from '../utils/messages';

const err = () => messages.lowercase;

const validRoomType = JoiValidator.validArray().items(Joi.string()
  .regex(/^[a-z]+$/).required().error(err)).error(err);
const validRoomNumber = JoiValidator.validateNumber().min(1).required();
const isValidId = JoiValidator.validateUuidV4().required();

const accommodationSchema = Joi.object({
  country: JoiValidator.validateString().valid('Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina',
    'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
    'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
    'Central African Republic (CAR)', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Democratic Republic of the Congo', 'Republic of the Costa Rica',
    "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
    'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo',
    'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
    'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
    'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine',
    'Panama', 'Papua New Guinea', 'Paraguay,', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
    'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
    'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
    'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
    'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates (UAE)', 'United Kingdom (UK)', 'United States of America (USA)', 'Uruguay',
    'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe').required().error(() => messages.inValidCountry),
  city: JoiValidator.validateString().required(),
  address: JoiValidator.validateString().required(),
  accommodation: JoiValidator.validateString().required(),
  accommodationType: JoiValidator.validateString().required(),
  roomType: validRoomType,
  numOfRooms: validRoomNumber,
  description: JoiValidator.validateString().required(),
  facilities: JoiValidator.validArray(JoiValidator.validateString()).required(),
  images: JoiValidator.validateString()
});

const bookAccommodationSchema = Joi.object({
  accommodationId: isValidId,
  typeOfRoom: validRoomType,
  numOfRooms: validRoomNumber,
  tripRequestId: isValidId,
  checkIn: JoiValidator.compareDate('checkOut').required(),
  checkOut: JoiValidator.validateDate().required(),
  adults: JoiValidator.validateNumber().min(1),
  children: JoiValidator.validateNumber().min(0)
});

const accommodationIdSchema = Joi.object({
  accommodationId: JoiValidator.validateString().uuid().required()
});

const accomodationFeedbackSchema = Joi.object({
  accommodationId: isValidId,
  message: JoiValidator.validateString().required(),
});

const destinationCitySchema = Joi.object({
  destinationCity: JoiValidator.validateString().required()
});

export {
  accommodationSchema,
  bookAccommodationSchema,
  accommodationIdSchema,
  accomodationFeedbackSchema,
  destinationCitySchema
};
