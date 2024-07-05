const blacklist = require('../../me-modals/blacklist/blacklisted');

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        try {
            const data = await blacklist.findOne({ UserID: member.id });
            if (data) {
                await member.ban({ reason: data.Reason });
            }
        } catch (error) {
            console.error('Error banning blacklisted member:', error);
        }
    }
};
