package org.techforumist.addressbook.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

@Entity
public class GymUser {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String firstName;
	
	private String middleName;
	
	private String lastName;
	
	private String emailId;
	
	private Date joiningDate;
	
	private Date dob;
	
	private Date feeSubmitDate;
	
	private Date feeDueDate;
	
	private String gender;
	
	private String phone;
	
	private String userName;

	
	@ManyToOne
	@JoinColumn(name = "address")
	private Address address;
	
	@ColumnDefault("'UNPAID'")
	private String feeStatus;

	@ColumnDefault("'white'")
	private String feeStatusColor;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getFeeSubmitDate() {
		return feeSubmitDate;
	}

	public void setFeeSubmitDate(Date feeSubmitDate) {
		this.feeSubmitDate = feeSubmitDate;
	}

	public Date getFeeDueDate() {
		return feeDueDate;
	}

	public void setFeeDueDate(Date feeDueDate) {
		this.feeDueDate = feeDueDate;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUserName() {
		return this.getFirstName() +','+ this.getLastName();
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getFeeStatus() {
		return feeStatus;
	}

	public void setFeeStatus(String feeStatus) {
		this.feeStatus = feeStatus;
	}

	public String getFeeStatusColor() {
		return feeStatusColor;
	}

	public void setFeeStatusColor(String feeStatusColor) {
		this.feeStatusColor = feeStatusColor;
	}	
	
	
}
