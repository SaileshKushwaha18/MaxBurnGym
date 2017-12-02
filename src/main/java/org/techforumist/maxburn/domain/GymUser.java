package org.techforumist.maxburn.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ColumnDefault;

/**
 * @author Sailesh
 *
 */
@Entity
public class GymUser implements Serializable{
	
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

	@SuppressWarnings("unused")
	private String userName;

	@OneToOne
	@JoinColumn(name = "addressId")
	private Address address;

	@ColumnDefault("'UNPAID'")
	private String feeStatus;

	@ColumnDefault("'white'")
	private String feeStatusColor;

	private String exercise;
	
	//Fee Details
	
	private Integer packages;   // Defines duration of package
	
	private Integer extraPackages;   // Defines extra duration on the top of package.
	
	private Integer totalFee;
	
	private Integer submittedFee;
	
	private Integer balanceFee;
	
	private Integer feeDiscount; // Defines Discount given to the user.
	
	private Date packageStartDate;

	private Date packageEndDate;
	
	private Integer isNewUser;
	
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
		setUserName(this.getFirstName() + ',' + this.getLastName());
		return this.getFirstName() + ',' + this.getLastName();
	}

	public void setUserName(String userName) {
		this.userName = this.getFirstName() + ',' + this.getLastName();
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

	public String getExercise() {
		return exercise;
	}

	public void setExercise(String exercise) {
		this.exercise = exercise;
	}

	public Integer getPackages() {
		return packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}

	public Integer getExtraPackages() {
		return extraPackages;
	}

	public void setExtraPackages(Integer extraPackages) {
		this.extraPackages = extraPackages;
	}

	public Integer getTotalFee() {
		return totalFee;
	}

	public void setTotalFee(Integer totalFee) {
		this.totalFee = totalFee;
	}

	public Integer getSubmittedFee() {
		return submittedFee;
	}

	public void setSubmittedFee(Integer submittedFee) {
		this.submittedFee = submittedFee;
	}

	public Integer getBalanceFee() {
		return balanceFee;
	}

	public void setBalanceFee(Integer balanceFee) {
		this.balanceFee = balanceFee;
	}

	public Integer getFeeDiscount() {
		return feeDiscount;
	}

	public void setFeeDiscount(Integer feeDiscount) {
		this.feeDiscount = feeDiscount;
	}

	public Date getPackageStartDate() {
		return packageStartDate;
	}

	public void setPackageStartDate(Date packageStartDate) {
		this.packageStartDate = packageStartDate;
	}

	public Date getPackageEndDate() {
		return packageEndDate;
	}

	public void setPackageEndDate(Date packageEndDate) {
		this.packageEndDate = packageEndDate;
	}

	public Integer getIsNewUser() {
		return isNewUser;
	}

	public void setIsNewUser(Integer isNewUser) {
		this.isNewUser = isNewUser;
	}

}
