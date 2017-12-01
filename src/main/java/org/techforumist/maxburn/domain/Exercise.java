package org.techforumist.maxburn.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Exercise implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String type;
	
	private String fee;
	
	private String packages;   // Defines duration of package
	
	private String extraPackages;   // Defines extra duration on the top of package.
	
	private String totalFee;
	
	private String submittedFee;
	
	private String balanceFee;
	
	private String feeDiscount; // Defines Discount given to the user.
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFee() {
		return fee;
	}

	public void setFee(String fee) {
		this.fee = fee;
	}

	public String getPackages() {
		return packages;
	}

	public void setPackages(String packages) {
		this.packages = packages;
	}

	public String getExtraPackages() {
		return extraPackages;
	}

	public void setExtraPackages(String extraPackages) {
		this.extraPackages = extraPackages;
	}

	public String getTotalFee() {
		return totalFee;
	}

	public void setTotalFee(String totalFee) {
		this.totalFee = totalFee;
	}

	public String getSubmittedFee() {
		return submittedFee;
	}

	public void setSubmittedFee(String submittedFee) {
		this.submittedFee = submittedFee;
	}

	public String getBalanceFee() {
		return balanceFee;
	}

	public void setBalanceFee(String balanceFee) {
		this.balanceFee = balanceFee;
	}

	public String getFeeDiscount() {
		return feeDiscount;
	}

	public void setFeeDiscount(String feeDiscount) {
		this.feeDiscount = feeDiscount;
	}

}
