package data;

import java.util.List;

import entities.People;

public interface PeopleDAO {

	public List<People> index();
	public People show(int id);
	public People create(String quizJSON);
	public People update(int id, String quizJSON);
	public boolean destroy(int id);
	boolean updateDate(int id, String dateJson);
	

}
