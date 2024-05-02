const mongoose = require('mongoose');

const requiredForLength = ['Solder', 'Wire', 'Display Cable', 'Ethernet Cable'];
const validClasses = ['Resistor', 'Solder', 'Wire', 'Display Cable', 'Ethernet Cable'];

//Ethernet will have its own special case
const requiredForType = ['Solder', 'Display Cable'];
const typeEnums = {
    'Solder': ["lead", "lead-free", "rosin-core", "acid-core"],
    'Display Cable': ['hdmi', 'vga', 'displayport', 'micro-hdmi']
};

const partSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true
    },
    class:{
        type: String,
        required: true,
        enum: validClasses
    },
    updateDate:{
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        default: 0
    },
    characteristics: {
        resistance: { 
            type: Number, 
            required: function() {
                return this.class === 'Resistor';
            }
        },
        tolerance: { 
            type: Number, 
            required: function() {
                return this.class === 'Resistor';
            }
        },
        type: {
            type: String,
            required: function() {
                return requiredForType.includes(this.class);
            },
            validate: {
                validator: function(value) {
                    this._tempClass = this.class;
                    return typeEnums[this.class] && typeEnums[this.class].includes(value);
                },
                message: function(props) {
                    const validTypes = typeEnums[this._tempClass] || []; // Safeguard against undefined
                    return `${props.value} is not a valid type`;
                }
            }
        },
        length: { 
            type: mongoose.Decimal128, 
            required: function() {
                return requiredForLength.includes(this.class);
            } 
        },
        gauge: { 
            type: mongoose.Decimal128, 
            required: function() {
                return this.class === 'Wire';
            }
        },
        color: { 
            type: String, 
            required: function() {
                return this.class === 'Display Cable';
            }
        },
        alphaType: { 
            type: String,
            required: function() {
                return this.class === 'Ethernet Cables';
            },
            enum:{
                values: ['male', 'female'],
                message: props => `${props.value} is not a valid alphaType.`
            }
        },
        betaType: { 
            type: String, 
            required: function() {
                return this.class === 'Ethernet Cables';
            },
            enum:{ 
                values: ['male', 'female'],
                message: props => `${props.value} is not a valid betaType.`
            }  
        },
        speed: { 
            type: String,
            required: function() {
                return this.class === 'Ethernet Cables';
            },
            enum:{ 
                values: ['10mbps', '100mbps', '1gbps', '10gbps'],
                message: props => `${props.value} is not a valid speed.`
            }
        }
    }
});

// Pre-save hook to update the lastUpdatedDate field to the current time
partSchema.pre('save', function(next) {
    this.updateDate = new Date();
    next();
});

partSchema.pre('validate', function(next) {
    this._tempClass = this.class; // Store class for later access
    next();
});

module.exports = mongoose.model('Part', partSchema);