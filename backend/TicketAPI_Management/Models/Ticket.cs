using System;

namespace TicketAPI_Management.Models
{
    public class Ticket
    {
        public int TicketID { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; } 
    }

}
