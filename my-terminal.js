const commands = {
    help() {
        term.echo(`The following are the commands:\n${help}\nThe commands are similar to a terminal environment and have the same functionality`);
    },
    cd(dir = null) {
        const dirs = Object.keys(directories);
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    },
    ls(dir = null) {
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                print_dirs();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in directories) {
                    this.echo(directories[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_dirs();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
            print_dirs();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    },

    checker() {
        term.echo($(`<ul><li>Hello World</li><li>Hello World</li><li>Hello World</li></ul>`))
    },

};

const user = 'guest';
const server = 'k_chhajer.github.io';

$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;]`;
};

$.terminal.xml_formatter.tags.blue = (attrs) => {
    return `[[;#55F;;${attrs.class}]`;
};

const directories = {
    aboutme: [
        '<img class="fade-in" src="myphoto.jpg" alt="My Photo" style="width:20%;"/>',
        '<white>About Me</white>',

        '<p style="width:20%;">Hi! My name is Krish and I am a first year International Engineering Scholarship Recipient studying Computer Engineering at The University of Toronto. I was born and brought up in Kolkata, India and I love coding, reading about everything technical and of course, die hard cricket fan!</p>',
    ],
    projects: [
        '',
        '<white>Projects</white>',
        [
            ['Fall Detecting using Deep Learning',
             'https://www.github.com/k-chhajer',
             'CNN-LSTM Model to predict Falls in elderly using sensor data from your phone'
            ],
            ['Personal Portfolio Website',
             'https://www.k-chhajer.github.io',
             'Terminal Portfolio Website built using HTML, CSS and jQuery'
            ],
            ['MunchMate',
             'https://www.github.com/k-chhajer',
             'A Discord Bot that helps students select nutritious meals from dorm menus based on their nutrition choices'
            ],
            ['Spam SMS Detection',
             'https://www.github.com/k-chhajer',
             'Character level RNN trained on the UCI SMS Dataset to detect Spam messages'
            ],
        ].map(([name, url, description = '']) => {
            return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
        }),
        ''
    ].flat(),
    skills: [
        '',
        '<white>languages</white>',

        [
            'HTML/CSS',
            'JavaScript',
            'Python',
            'C',
            'C++',
            'MATLAB'
        ].map(lang => `* <yellow>${lang}</yellow>`),
        '',
        '<white>libraries</white>',
        [
            'React.js',
            'Node.js',
            'OpenCV',
            'PyTorch',
        ].map(lib => `* <green>${lib}</green>`),
        '',
        '<white>tools</white>',
        [
            'git',
            'PyCharm'
        ].map(lib => `* <blue>${lib}</blue>`),
        ''
    ].flat(),
    snake: [
        '',
        '<white>This section is currently under construction!</white>'
    ].flat()

};


function print_dirs() {
    const dirs = Object.keys(directories);
    term.echo(dirs.map(dir => {
        return `<blue class="directory">${dir}</blue>`;
    }).join('\n'));
}


function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

const root = '~';
let cwd = root;


const font = 'Dr Pepper';
figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/'});
figlet.preloadFonts([font], ready);

function rainbow(string) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}

function ready() {
    term.echo(rainbow(render('Krish\'s Terminal Portfolio')))
    term.echo('\nWelcome to my website, Developers!\nTo browse all available functions, enter "help" command.');
 }

// function ready() {
//     term.echo(render('Krish\'s Terminal Portfolio'));
//     term.echo('\nWelcome to my website, Developers!\nTo browse all available functions, enter "help" command.')
// }

function render(text) {
    const cols = term.cols();
    return figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    });
}

const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false,
    prompt
})

const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  });

const command_list = ['clear'].concat(Object.keys(commands))
const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});
const help = formatted_list.join('\n')

term.on('click', '.command', function() {
    const command = $(this).text();
    term.exec(`${command}`);
});

term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`);
});


const any_command_re = new RegExp(`^\s*(${command_list.join('|')})`);
$.terminal.new_formatter([any_command_re, '<white>$1</white>']);

 
