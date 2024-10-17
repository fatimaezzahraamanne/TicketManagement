using Microsoft.EntityFrameworkCore;
using TicketAPI_Management.Models;

namespace TicketAPI_Management.Data
{
    public class Ticket_DbContext : DbContext
    {
        public Ticket_DbContext(DbContextOptions<Ticket_DbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }
    }
}
