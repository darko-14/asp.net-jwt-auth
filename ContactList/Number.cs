//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ContactList
{
    using System;
    using System.Collections.Generic;
    
    public partial class Number
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string Number1 { get; set; }
        public int ContactID { get; set; }
    
        public virtual Contact Contact { get; set; }
    }
}