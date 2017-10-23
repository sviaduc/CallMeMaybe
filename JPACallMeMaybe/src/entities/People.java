package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;




@Entity
@Table(name="People")
public class People {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String callDate;
	
	private String relationship;
	
	private String birthday;
	
	@Transient
	private long carePoints;
	
	
	//gets and sets

	public long getCarePoints() {
		return carePoints;
	}

	public void setCarePoints(long carePoints) {
		this.carePoints = carePoints;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCallDate() {
		return callDate;
	}

	public void setCallDate(String callDate) {
		this.callDate = callDate;
	}

	public String getRelationship() {
		return relationship;
	}

	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	@Override
	public String toString() {
		return "People [id=" + id + ", name=" + name + ", callDate=" + callDate + ", relationship=" + relationship
				+ ", birthday=" + birthday + "]";
	}
	
	
}
